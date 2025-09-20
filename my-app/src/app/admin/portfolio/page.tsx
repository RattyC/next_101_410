"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPortfolioSeeds } from "@/data/portfolioSeed";
import type { Portfolio } from "@/types/portfolio";

type SortKey = "name" | "gpa" | "school" | "createdAt";

export default function AdminPortfolioListPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    const data = await res.json();
    setPortfolios(data);
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const rows = useMemo(() => {
    const sorted = [...portfolios].sort((a, b) => {
      let av: number | string = 0;
      let bv: number | string = 0;
      if (sortKey === "name") {
        av = `${a.firstName} ${a.lastName}`.toLowerCase();
        bv = `${b.firstName} ${b.lastName}`.toLowerCase();
        return av.localeCompare(bv);
      }
      if (sortKey === "gpa") {
        return a.gpa - b.gpa;
      }
      if (sortKey === "school") {
        av = a.school.toLowerCase();
        bv = b.school.toLowerCase();
        return av.localeCompare(bv);
      }
      return a.createdAt - b.createdAt;
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [portfolios, sortKey, sortDir]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">รายชื่อนักศึกษา (Portfolio)</h1>
        <div className="flex gap-2">
          {portfolios.length === 0 && (
            <button
              className="rounded border px-4 py-2 hover:bg-gray-50 shadow-sm"
              onClick={() => {
                const items = getPortfolioSeeds();
                Promise.all(
                  items.map((it) => fetch("/api/portfolio", { method: "POST", body: JSON.stringify(it) }))
                ).then(refresh);
              }}
            >
              เติมข้อมูลตัวอย่าง
            </button>
          )}
          {portfolios.length > 0 && (
            <button
              className="rounded border px-4 py-2 hover:bg-gray-50 shadow-sm"
              onClick={() => {
                if (confirm("ยืนยันการล้างข้อมูลทั้งหมด?")) {
                  fetch("/api/portfolio", { method: "DELETE" }).then(refresh);
                }
              }}
            >
              ล้างข้อมูลทั้งหมด
            </button>
          )}
          <Link
            href="/portfolio/new"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-sm"
          >
            เพิ่ม Portfolio
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-[48px]">
            <tr>
              <th className="px-3 py-2 text-left">
                <button onClick={() => toggleSort("name")} className="font-medium">
                  ชื่อ-สกุล {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button onClick={() => toggleSort("school")} className="font-medium">
                  โรงเรียน {sortKey === "school" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button onClick={() => toggleSort("gpa")} className="font-medium">
                  GPA {sortKey === "gpa" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button onClick={() => toggleSort("createdAt")} className="font-medium">
                  วันที่เพิ่ม {sortKey === "createdAt" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
              <th className="px-3 py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-gray-500">กำลังโหลด...</td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                  ยังไม่มีข้อมูล กด "เพิ่ม Portfolio" หรือปุ่ม "เติมข้อมูลตัวอย่าง" เพื่อเริ่มต้น
                </td>
              </tr>
            )}
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium">{p.firstName} {p.lastName}</td>
                <td className="px-3 py-2">{p.school}</td>
                <td className="px-3 py-2"><span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{p.gpa.toFixed(2)}</span></td>
                <td className="px-3 py-2">{new Date(p.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <Link
                    href={`/admin/portfolio/${p.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ดูรายละเอียด
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
