import { promises as fs } from "fs";
import path from "path";
import type { NewPortfolio, Portfolio } from "@/types/portfolio";

type DB = {
  list: () => Promise<Portfolio[]>;
  get: (id: string) => Promise<Portfolio | null>;
  create: (item: NewPortfolio) => Promise<Portfolio>;
  clear: () => Promise<void>;
};

function genId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

// Simple file persistence for local dev only
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");
const TMP_FILE = path.join(DATA_DIR, "portfolio.tmp.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ index: [], items: {} }, null, 2), "utf8");
  }
}

async function readFileStore() {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as { index: string[]; items: Record<string, Portfolio> };
  } catch (e) {
    // Self-heal corrupted file by resetting to empty structure
    const empty = { index: [], items: {} as Record<string, Portfolio> };
    try {
      // Backup corrupted file
      const bak = path.join(DATA_DIR, `portfolio.${Date.now()}.bak.json`);
      await fs.rename(DATA_FILE, bak).catch(() => {});
    } catch {}
    await fs.writeFile(DATA_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function writeFileStore(data: { index: string[]; items: Record<string, Portfolio> }) {
  await ensureDataFile();
  const json = JSON.stringify(data, null, 2);
  // Atomic write: write to temp then rename
  await fs.writeFile(TMP_FILE, json, "utf8");
  await fs.rename(TMP_FILE, DATA_FILE);
}

function fileDB(): DB {
  return {
    async list() {
      const data = await readFileStore();
      return data.index.map((id) => data.items[id]).filter(Boolean);
    },
    async get(id: string) {
      const data = await readFileStore();
      return data.items[id] ?? null;
    },
    async create(item: NewPortfolio) {
      const data = await readFileStore();
      const rec: Portfolio = { ...item, id: genId(), createdAt: Date.now() };
      data.index.unshift(rec.id);
      data.items[rec.id] = rec;
      await writeFileStore(data);
      return rec;
    },
    async clear() {
      await writeFileStore({ index: [], items: {} });
    },
  };
}

// Vercel KV (Upstash Redis REST) adapter — lightweight, no extra deps
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvFetch(pathname: string, init?: RequestInit) {
  if (!KV_URL || !KV_TOKEN) throw new Error("KV not configured");
  const base = new URL(KV_URL);
  const path = pathname.startsWith("/") ? pathname : "/" + pathname;
  const url = new URL(path, base).toString();
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV error ${res.status}: ${text}`);
  }
  const txt = await res.text();
  try {
    return JSON.parse(txt);
  } catch {
    return { result: txt };
  }
}

async function kvGet<T>(key: string): Promise<T | null> {
  const data = await kvFetch(`/get/${encodeURIComponent(key)}`);
  const val = data?.result ?? null;
  if (val == null) return null;
  try {
    return JSON.parse(val) as T;
  } catch {
    return null;
  }
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  const bodyString = JSON.stringify(value);
  // Vercel KV style: POST /set/key with JSON { value }
  try {
    await kvFetch(`/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: bodyString }),
    });
    return;
  } catch (_) {
    // Upstash style fallback: POST /set/key/<value>
    await kvFetch(`/set/${encodeURIComponent(key)}/${encodeURIComponent(bodyString)}`, { method: "POST" });
  }
}

async function kvDel(key: string): Promise<void> {
  await kvFetch(`/del/${encodeURIComponent(key)}`);
}

async function kvKeys(pattern: string): Promise<string[]> {
  const data = await kvFetch(`/keys/${encodeURIComponent(pattern)}`);
  return data?.result ?? [];
}

function kvDB(): DB {
  const IDX = "portfolio:index";
  return {
    async list() {
      const ids = (await kvGet<string[]>(IDX)) || [];
      const items: Portfolio[] = [];
      for (const id of ids) {
        const rec = await kvGet<Portfolio>(`portfolio:${id}`);
        if (rec) items.push(rec);
      }
      return items;
    },
    async get(id: string) {
      const rec = await kvGet<Portfolio>(`portfolio:${id}`);
      return rec ?? null;
    },
    async create(item: NewPortfolio) {
      const rec: Portfolio = { ...item, id: genId(), createdAt: Date.now() };
      const ids = (await kvGet<string[]>(IDX)) || [];
      ids.unshift(rec.id);
      await kvSet(`portfolio:${rec.id}`, rec);
      await kvSet(IDX, ids);
      return rec;
    },
    async clear() {
      const ids = (await kvGet<string[]>(IDX)) || [];
      for (const id of ids) await kvDel(`portfolio:${id}`);
      await kvSet(IDX, []);
    },
  };
}

export function getPortfolioDB(): DB {
  if (KV_URL && KV_TOKEN) return kvDB();
  // Local dev fallback: file persistence (Node runtime only)
  return fileDB();
}
