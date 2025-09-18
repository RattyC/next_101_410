"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useMembers } from "@/store/membersStore";
import { members as seedMembers } from "@/data/members";
import { getPortfolioSeeds } from "@/data/portfolioSeed";

export default function AdminDashboardPage() {
  const portfolios = usePortfolioStore((s) => s.portfolios);
  const addedMembers = useMembers((s) => s.members);
  const membersCount = addedMembers.length + seedMembers.length;

  function seedDemo() {
    if (portfolios.length > 0) return;
    const items = getPortfolioSeeds();
    items.forEach((it) => usePortfolioStore.getState().add(it));
  }

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {portfolios.length === 0 && (
          <button onClick={seedDemo} className="rounded border px-3 py-1.5 hover:bg-gray-50 shadow-sm text-sm">
            เติมข้อมูลตัวอย่าง
          </button>
        )}
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Portfolio ทั้งหมด</div>
          <div className="text-3xl font-semibold mt-1">{portfolios.length}</div>
          <div className="mt-3">
            <Link href="/admin/portfolio" className="text-blue-600 hover:underline text-sm">
              จัดการรายชื่อนักศึกษา →
            </Link>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">สมาชิกทั้งหมด</div>
          <div className="text-3xl font-semibold mt-1">{membersCount}</div>
          <div className="mt-3 flex gap-3 text-sm">
            <Link href="/member" className="text-blue-600 hover:underline">ดูรายชื่อสมาชิก</Link>
            <Link href="/addmember" className="text-blue-600 hover:underline">เพิ่มสมาชิก</Link>
          </div>
        </div>
      </section>

      <nav className="flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
