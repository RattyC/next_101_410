export type Product = {
  id: string;
  name: string;
  price: number; // THB
  description: string;
};

export const products: Product[] = [
  { id: "p01", name: "คีย์บอร์ด 60%", price: 1890, description: "คีย์บอร์ดขนาดกะทัดรัด เหมาะพกพา สวิตช์สัมผัสนุ่ม" },
  { id: "p02", name: "เมาส์ไร้สาย", price: 790, description: "เซ็นเซอร์แม่นยำ น้ำหนักเบา ใช้งานสบายมือ" },
  { id: "p03", name: "หูฟังครอบหู", price: 1290, description: "เสียงใส เบสแน่น ใส่สบายไม่บีบหู" },
  { id: "p04", name: "สาย USB‑C", price: 190, description: "สายถักทนทาน ชาร์จไว ยาว 1 เมตร" },
  { id: "p05", name: "ขาตั้งแล็ปท็อป", price: 590, description: "พับเก็บได้ ปรับองศา ลดปวดคอ" },
  { id: "p06", name: "กระเป๋าโน้ตบุ๊ก", price: 990, description: "กันกระแทก กันละอองน้ำ ช่องเก็บของเยอะ" },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

