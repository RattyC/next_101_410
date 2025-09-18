export type Member = {
  id: string;
  name: string;      // Thai name
  nameEn: string;    // English name
  nickname?: string;
  role: string;
  bio: string;       // Freeform, human‑like tone
  heightCm: number;
  ageYears: number;
  weightKg: number;
  hometown?: string;
  interests?: string[];
  socials?: {
    github?: string;
    twitter?: string;
  };
  email?: string;
};

export const members: Member[] = [
  {
    id: "01",
    name: "นพดล ศรีสุวรรณ",
    nameEn: "Nopadon Srisuwan",
    nickname: "ดล",
    role: "นักศึกษา",
    bio: "ชอบลองของใหม่ ฝั่งเว็บนี่เล่นตั้งแต่ HTML ยุคโต๊ะเรียน จนมาหลง Tailwind/Next.js เวลาว่างชอบคั่วกาแฟเองกับอ่านรีวิวคีย์บอร์ด",
    heightCm: 172,
    ageYears: 21,
    weightKg: 64,
    hometown: "ขอนแก่น",
    interests: ["Web UI", "UX", "TypeScript"],
    socials: { github: "nopadon-dev" },
    email: "nopadon@example.com",
  },
  {
    id: "02",
    name: "กมลพร วัฒนวงศ์",
    nameEn: "Kamolporn Wattanawong",
    nickname: "มล",
    role: "นักศึกษา",
    bio: "สมุดรวมโจทย์เป็นตั้ง ชอบเวลากดรันแล้วได้เขียวๆ ยาวๆ ใน LeetCode/Codeforces โตมากับ C++ แต่หลังๆ เริ่มถูกใจ Rust",
    heightCm: 160,
    ageYears: 22,
    weightKg: 52,
    hometown: "เชียงใหม่",
    interests: ["Algorithms", "Data Structures", "Rust"],
    email: "kamolporn@example.com",
  },
  {
    id: "03",
    name: "ชยุต กาญจนกิจ",
    nameEn: "Chayut Kanchanakij",
    nickname: "ยุต",
    role: "นักศึกษา",
    bio: "ลงมือก่อนค่อยแก้ทีหลัง สไตล์ Full‑stack เน้นส่งงานให้ทันและอ่านง่าย ชอบเขียนพวก CLI เล็กๆ ช่วยชีวิตประจำวัน",
    heightCm: 175,
    ageYears: 23,
    weightKg: 68,
    hometown: "กรุงเทพฯ",
    interests: ["Full‑stack", "Next.js", "Node.js"],
    socials: { github: "chayutk" },
    email: "chayut@example.com",
  },
  {
    id: "04",
    name: "ดนัย ทองดี",
    nameEn: "Danai Thongdee",
    nickname: "ไนซ์",
    role: "นักศึกษา",
    bio: "ชอบจับข้อมูลจริง มั่วๆ กับโน้ตบุ๊กจนพัดลมดัง รันโมเดลยาวๆ ช่วงดึกๆ สนใจ LLM เล็กที่รันบนเครื่องได้",
    heightCm: 170,
    ageYears: 22,
    weightKg: 62,
    hometown: "นครปฐม",
    interests: ["ML", "LLM", "Data"],
    email: "danai@example.com",
  },
  {
    id: "05",
    name: "ธนพร ชัยเจริญ",
    nameEn: "Thanaporn Chaicharoen",
    nickname: "โฟกัส",
    role: "นักศึกษา",
    bio: "คนสายหน้าบ้าน ชอบปรับ spacing ให้พอดีตา ใส่ animation นิดหน่อยพอให้รู้สึกมีชีวิตชีวา ช่วงนี้ลองเล่น Framer Motion",
    heightCm: 162,
    ageYears: 21,
    weightKg: 50,
    hometown: "อุบลราชธานี",
    interests: ["Frontend", "Tailwind", "Animation"],
    email: "thanaporn@example.com",
  },
  {
    id: "06",
    name: "ภาคิน วงศ์พัฒน์",
    nameEn: "Pakin Wongphat",
    nickname: "คิน",
    role: "นักศึกษา",
    bio: "หลังบ้านชัดๆ ชอบออกแบบสคีมาดีๆ กับเขียนเทสให้ครบ ถนัด Postgres และชอบดู explain analyze แก้คอขวด",
    heightCm: 178,
    ageYears: 24,
    weightKg: 72,
    hometown: "นครราชสีมา",
    interests: ["Backend", "Postgres", "Testing"],
    email: "pakin@example.com",
  },
  {
    id: "07",
    name: "ศุภชัย สิงห์โต",
    nameEn: "Supachai Singto",
    nickname: "ชัย",
    role: "นักศึกษา",
    bio: "ถังไม้ฝนคือแรงบันดาลใจ ชอบ automate ทุกอย่างให้กดปุ่มเดียวแล้วได้ของ พร้อมเขียน docs ให้ทีมตามทัน",
    heightCm: 169,
    ageYears: 23,
    weightKg: 67,
    hometown: "พิษณุโลก",
    interests: ["DevOps", "Docker", "CI/CD"],
    socials: { github: "supachai-ops", twitter: "@chai_ops" },
    email: "supachai@example.com",
  },
  {
    id: "08",
    name: "หทัยรัตน์ มงคล",
    nameEn: "Hatairat Mongkol",
    nickname: "ฮัท",
    role: "นักศึกษา",
    bio: "ชอบทำของเล็กๆ ที่คนรอบตัวได้ใช้จริง สนใจ Mobile/UX การตั้งชื่อและข้อความในแอปสำคัญไม่แพ้โค้ด",
    heightCm: 158,
    ageYears: 22,
    weightKg: 48,
    hometown: "ชลบุรี",
    interests: ["Mobile", "UX", "Copywriting"],
    email: "hatairat@example.com",
  },
];

export function getMemberById(id: string) {
  return members.find((m) => m.id === id);
}
