import { NextResponse } from "next/server";
import { getPortfolioDB } from "@/lib/portfolio-db";

export async function GET(_req: Request, context: any) {
  const db = getPortfolioDB();
  const id = (await context?.params)?.id ?? context?.params?.id;
  const item = await db.get(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}
