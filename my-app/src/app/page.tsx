import Link from "next/link";

export default function Home() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">CS 410 — Portfolio & Members</h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/member"
                className="inline-flex items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                ดูสมาชิก
              </Link>
              <Link
                href="/admin/portfolio"
                className="inline-flex items-center justify-center rounded border border-black/10 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                จัดการผลงาน
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded border border-black/10 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                เกี่ยวกับเรา
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/portfolio/new"
            className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <p className="font-medium">เพิ่มผลงานใหม่</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">เริ่มแชร์โปรเจกต์ล่าสุดของคุณ</p>
          </Link>
          <Link
            href="/contact"
            className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <p className="font-medium">ติดต่อเรา</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">ส่งคำถามหรือข้อเสนอแนะ</p>
          </Link>
          <Link
            href="/member"
            className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <p className="font-medium">สำรวจสมาชิก</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">ดูทีมและความเชี่ยวชาญ</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
