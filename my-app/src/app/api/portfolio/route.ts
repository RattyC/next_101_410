import { NextResponse } from "next/server";
import { getPortfolioDB } from "@/lib/portfolio-db";
import type { NewPortfolio } from "@/types/portfolio";

export async function GET() {
  const db = getPortfolioDB();
  const items = await db.list();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const db = getPortfolioDB();
  const body = (await req.json()) as NewPortfolio;
  const created = await db.create(body);
  return NextResponse.json(created, { status: 201 });
}

export async function DELETE() {
  const db = getPortfolioDB();
  await db.clear();
  return NextResponse.json({ ok: true });
}

