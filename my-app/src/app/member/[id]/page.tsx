"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { members as seedMembers, getMemberById } from "@/data/members";
import { useMembers } from "@/store/membersStore";

export default function MemberDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const extra = useMembers((s) => s.members);
  const fromStore = extra.find((m) => m.id === id);
  const member = fromStore ?? getMemberById(id);
  if (!member) {
    return (
      <main className="p-6">
        <p>ไม่พบสมาชิกที่ร้องขอ</p>
        <div className="mt-6">
          <Link className="text-sm hover:underline" href="/member">← Back to list</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-1">{member.name}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{member.nameEn}{member.nickname ? ` • ${member.nickname}` : ''}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.role}</p>
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div><span className="text-gray-500">ส่วนสูง:</span> {member.heightCm} ซม.</div>
        <div><span className="text-gray-500">อายุ:</span> {member.ageYears} ปี</div>
        <div><span className="text-gray-500">น้ำหนัก:</span> {member.weightKg} กก.</div>
        {member.hometown && (<div><span className="text-gray-500">บ้านเกิด:</span> {member.hometown}</div>)}
      </div>
      <p className="mb-4 whitespace-pre-line">{member.bio}</p>
      {member.interests && member.interests.length > 0 && (
        <div className="mb-4 text-sm">
          <span className="text-gray-500">ความสนใจ:</span> {member.interests.join(', ')}
        </div>
      )}
      {member.socials && (member.socials.github || member.socials.twitter) && (
        <div className="mb-4 text-sm flex gap-3">
          {member.socials.github && (
            <a className="underline" href={`https://github.com/${member.socials.github}`} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {member.socials.twitter && (
            <a className="underline" href={`https://twitter.com/${member.socials.twitter.replace(/^@/, '')}`} target="_blank" rel="noreferrer">Twitter</a>
          )}
        </div>
      )}
      {member.email && (
        <p className="text-sm">Email: <a className="underline" href={`mailto:${member.email}`}>{member.email}</a></p>
      )}
      <div className="mt-6">
        <Link className="text-sm hover:underline" href="/member">← Back to list</Link>
      </div>
    </main>
  );
}
