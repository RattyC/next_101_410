import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "รู้จักพันธกิจ วิธีการทำงาน และทีมของเรา",
};

export default function AboutPage() {
  return (
    <section className="py-8 md:py-10 space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          เกี่ยวกับเรา
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
          เราสร้างเครื่องมือและประสบการณ์เพื่อช่วยให้นักเรียน ทีมงาน และผู้สร้างผลงาน
          นำเสนอโปรเจกต์ได้อย่างชัดเจน เป็นมืออาชีพ และเข้าถึงได้สำหรับทุกคน
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-5">
          <h2 className="text-lg font-medium">พันธกิจ</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            ทำให้การเล่าเรื่องของผลงานเป็นเรื่องง่าย ตั้งแต่หน้า Portfolio
            ไปจนถึงเครื่องมือเล็กๆ ที่ช่วยบริหารข้อมูลได้จริงในชีวิตประจำวัน
          </p>
        </div>
        <div className="rounded-lg border border-black/10 p-5">
          <h2 className="text-lg font-medium">สิ่งที่เราทำ</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            ออกแบบ UI ที่สะอาดตา ใช้งานง่าย และมีประสิทธิภาพ
            เน้นโครงสร้างโค้ดที่อ่านง่าย พร้อมต่อยอดได้ในอนาคต
          </p>
        </div>
        <div className="rounded-lg border border-black/10 p-5">
          <h2 className="text-lg font-medium">วิธีการทำงาน</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            ยึดหลักเรียบง่าย ใช้แพทเทิร์นตรงไปตรงมา มีการทดสอบพื้นฐาน
            และให้ความสำคัญกับการเข้าถึง (Accessibility)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-black/10 p-5 text-center">
          <div className="text-2xl font-semibold">2024</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">เริ่มต้นโครงการ</div>
        </div>
        <div className="rounded-lg border border-black/10 p-5 text-center">
          <div className="text-2xl font-semibold">+25</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">โปรเจกต์ที่เผยแพร่</div>
        </div>
        <div className="rounded-lg border border-black/10 p-5 text-center">
          <div className="text-2xl font-semibold">+10</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">สมาชิกที่ร่วมพัฒนา</div>
        </div>
        <div className="rounded-lg border border-black/10 p-5 text-center">
          <div className="text-2xl font-semibold">99%</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">ความพึงพอใจของผู้ใช้</div>
        </div>
      </div>

      <div className="rounded-lg border border-black/10 p-5">
        <h2 className="text-lg font-medium">ไปต่อจากที่นี่</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link className="text-blue-600 hover:underline" href="/member">
              ดูรายชื่อสมาชิกและผู้มีส่วนร่วม
            </Link>
          </li>
          <li>
            <Link className="text-blue-600 hover:underline" href="/contact">
              ติดต่อเราเพื่อเสนอไอเดียหรือขอความช่วยเหลือ
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
