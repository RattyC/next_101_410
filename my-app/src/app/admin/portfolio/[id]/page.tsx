"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getPortfolioSeeds } from "@/data/portfolioSeed";

export default function PortfolioDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [portfolio, setPortfolio] = React.useState<any>(null);
  React.useEffect(() => {
    const id = params.id as string;
    fetch(`/api/portfolio/${id}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPortfolio(d));
  }, [params.id]);

  if (!portfolio) {
    return (
      <div className="mx-auto max-w-4xl p-6 space-y-4">
        <div className="rounded border bg-white p-4">
          <p className="mb-2 font-medium">ไม่พบข้อมูลนักศึกษา</p>
          <p className="text-sm text-gray-600">
            ข้อมูลถูกเก็บในเบราว์เซอร์แต่ละโดเมน (localStorage).
            หากเปิดลิงก์นี้บน Vercel โดยยังไม่เคยเพิ่มข้อมูลในโดเมนนั้น จะไม่พบรายการนี้
            โปรดกลับไปหน้าแอดมินแล้วกด “เติมข้อมูลตัวอย่าง” หรือ “เพิ่ม Portfolio” ก่อน จากนั้นเปิดลิงก์รายละเอียดจากรายการนั้นอีกครั้ง
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded border px-3 py-2 hover:bg-gray-50"
            onClick={async () => {
              const items = getPortfolioSeeds();
              await Promise.all(items.map((it) => fetch("/api/portfolio", { method: "POST", body: JSON.stringify(it) })));
              router.push("/admin/portfolio");
            }}
          >
            เติมข้อมูลตัวอย่างและกลับไปหน้าแอดมิน
          </button>
          <Link href="/admin/portfolio" className="rounded border px-3 py-2 hover:bg-gray-50">
            กลับไปหน้าแอดมิน
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">รายละเอียดนักศึกษา</h1>
        <Link href="/admin/portfolio" className="text-blue-600 hover:underline">
          ← กลับไปหน้ารายชื่อ
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg border bg-white p-5 shadow-sm">
        <div>
          {portfolio.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portfolio.photo}
              alt="student photo"
              className="h-48 w-48 object-cover rounded-lg border shadow-sm"
            />
          ) : (
            <div className="h-48 w-48 rounded-lg border flex items-center justify-center text-gray-400">
              ไม่มีรูปภาพ
            </div>
          )}
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-2">
          <Row label="ชื่อ-สกุล" value={`${portfolio.firstName} ${portfolio.lastName}`} />
          <Row label="ที่อยู่" value={portfolio.address} />
          <Row label="เบอร์โทร" value={portfolio.phone} />
          <Row label="โรงเรียน" value={portfolio.school} />
          <Row label="GPA" value={portfolio.gpa.toFixed(2)} />
          {portfolio.talent ? <Row label="ความสามารถพิเศษ" value={portfolio.talent} /> : null}
          <Row label="เหตุผลในการสมัคร" value={portfolio.motivation} />
          {portfolio.skills ? <Row label="ทักษะเพิ่มเติม" value={portfolio.skills} /> : null}
          <Row label="วันที่เพิ่ม" value={new Date(portfolio.createdAt).toLocaleString()} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">กิจกรรม/รางวัล/ผลงาน</h2>
        {portfolio.gallery?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portfolio.gallery.map((g: string, i: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={g}
                alt={`gallery-${i}`}
                className="h-32 w-full object-cover rounded-lg border shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ยังไม่มีรูปกิจกรรม/รางวัล/ผลงาน</p>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
