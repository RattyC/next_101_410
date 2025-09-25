"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { NewPortfolio } from "@/types/portfolio";

type FormInputs = NewPortfolio;

export default function NewPortfolioPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      school: "",
      gpa: undefined as unknown as number,
      talent: "",
      motivation: "",
      skills: "",
      photo: undefined,
      gallery: [],
    },
  });

  const photo = watch("photo");
  const gallery = watch("gallery");
  const [localPhoto, setLocalPhoto] = useState<string | undefined>(undefined);
  const [localGallery, setLocalGallery] = useState<string[]>([]);

  async function onSubmit(data: FormInputs) {
    const payload: FormInputs = {
      ...data,
      gpa: Number(data.gpa),
      photo: localPhoto,
      gallery: localGallery,
    };
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      alert("บันทึกไม่สำเร็จ");
      return;
    }
    reset();
    router.push("/admin/portfolio");
  }

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await readFileAsDataURL(f);
    setLocalPhoto(dataUrl);
    setValue("photo", dataUrl, { shouldDirty: true });
  }

  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = await Promise.all(files.map(readFileAsDataURL));
    const merged = [...localGallery, ...urls].slice(0, 12); // cap to 12
    setLocalGallery(merged);
    setValue("gallery", merged, { shouldDirty: true });
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">เพิ่ม Portfolio (TCAS69)</h1>
        <p className="text-sm text-gray-600">กรอกข้อมูลให้ครบถ้วน ระบบจะบันทึกลงฐานข้อมูล</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border bg-white p-5 shadow-sm">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ชื่อ <span className="text-red-600">*</span></label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("firstName", { required: "กรุณากรอกชื่อ" })}
              placeholder="ชื่อ"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">นามสกุล <span className="text-red-600">*</span></label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("lastName", { required: "กรุณากรอกนามสกุล" })}
              placeholder="นามสกุล"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">ที่อยู่ <span className="text-red-600">*</span></label>
            <textarea
              className="mt-1 w-full rounded border p-2"
              rows={3}
              {...register("address", { required: "กรุณากรอกที่อยู่" })}
              placeholder="ที่อยู่ปัจจุบัน"
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">เบอร์โทรศัพท์ <span className="text-red-600">*</span></label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("phone", {
                required: "กรุณากรอกเบอร์โทร",
                pattern: {
                  value: /^0\d{9}$/,
                  message: "รูปแบบเบอร์ไม่ถูกต้อง (เช่น 0812345678)",
                },
              })}
              placeholder="0812345678"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">โรงเรียน <span className="text-red-600">*</span></label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("school", { required: "กรุณากรอกโรงเรียน" })}
              placeholder="ชื่อโรงเรียน"
            />
            {errors.school && (
              <p className="text-red-600 text-sm">{errors.school.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">GPA <span className="text-red-600">*</span></label>
            <input
              type="number"
              step="0.01"
              min={0}
              max={4}
              className="mt-1 w-full rounded border p-2"
              {...register("gpa", {
                required: "กรุณากรอก GPA",
                valueAsNumber: true,
                min: { value: 0, message: "ขั้นต่ำ 0.00" },
                max: { value: 4, message: "ไม่เกิน 4.00" },
              })}
              placeholder="เช่น 3.75"
            />
            {errors.gpa && (
              <p className="text-red-600 text-sm">{String(errors.gpa.message)}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">ความสามารถพิเศษ</label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("talent")}
              placeholder="เช่น ดนตรี กีฬา เขียนโปรแกรม"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">เหตุผลในการสมัคร <span className="text-red-600">*</span></label>
            <textarea
              className="mt-1 w-full rounded border p-2"
              rows={4}
              {...register("motivation", {
                required: "กรุณาเขียนเหตุผล",
                minLength: { value: 20, message: "อย่างน้อย 20 ตัวอักษร" },
              })}
              placeholder="ทำไมถึงอยากเข้าเรียนสาขานี้..."
            />
            {errors.motivation && (
              <p className="text-red-600 text-sm">{errors.motivation.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">ทักษะเพิ่มเติม (ถ้ามี)</label>
            <input
              className="mt-1 w-full rounded border p-2"
              {...register("skills")}
              placeholder="เช่น JavaScript, UI/UX, ภาษาอังกฤษ"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">รูปถ่ายนักเรียน</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handlePhotoChange}
            />
            {localPhoto && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={localPhoto}
                alt="student photo preview"
                className="mt-2 h-40 w-40 object-cover rounded-lg border shadow-sm"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">กิจกรรม/รางวัล/ผลงาน (อัปโหลดหลายรูป)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full"
              onChange={handleGalleryChange}
            />
            {localGallery?.length ? (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {localGallery.map((g, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={g}
                    alt={`gallery-${i}`}
                    className="h-24 w-full object-cover rounded-lg border shadow-sm"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 shadow-sm"
          >
            บันทึก Portfolio
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded border px-4 py-2 hover:bg-gray-50 shadow-sm"
          >
            ล้างข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
}
