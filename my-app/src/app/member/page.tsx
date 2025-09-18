"use client";

import Link from "next/link";
import { members as seedMembers } from "@/data/members";
import { useMembers } from "@/store/membersStore";

function initials(name: string, fallback: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  const result = (a + b).toUpperCase();
  return result || fallback.slice(0, 2).toUpperCase();
}

export default function MemberPage() {
  const added = useMembers((s) => s.members);
  const members = [...added, ...seedMembers];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-3">Members</h1>
      <p className="text-sm text-gray-600 mb-4">รวมทั้งหมด {members.length} คน คลิกที่ชื่อเพื่อดูรายละเอียด</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <Link
            key={m.id}
            href={`/member/${m.id}`}
            className="rounded-lg border p-4 hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div
                aria-hidden
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold"
              >
                {initials(m.name, m.nameEn)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-gray-600">{m.nameEn}{m.nickname ? ` • ${m.nickname}` : ""}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-100">อายุ {m.ageYears}</span>
                  <span className="px-2 py-0.5 rounded bg-gray-100">สูง {m.heightCm} ซม.</span>
                  <span className="px-2 py-0.5 rounded bg-gray-100">หนัก {m.weightKg} กก.</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-700">{m.bio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
