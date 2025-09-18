"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMembers } from "@/store/membersStore";

type FormData = {
  nameTh: string;
  nameEn: string;
  email?: string;
  height: number;
  age: number;
};

export default function AddMemberPage() {
  const router = useRouter();
  const addMember = useMembers((s) => s.addMember);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      nameTh: "",
      nameEn: "",
      email: "",
      height: undefined as unknown as number,
      age: undefined as unknown as number,
    },
  });

  const onSubmit = (data: FormData) => {
    const id = addMember({
      name: data.nameTh,
      nameEn: data.nameEn,
      email: data.email,
      heightCm: Number(data.height),
      ageYears: Number(data.age),
    });
    reset();
    router.push(`/member/${id}`);
  };

  return (
    <main className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">เพิ่มสมาชิกใหม่</h1>
        <p className="text-sm text-gray-600">กรอกข้อมูลสมาชิกและบันทึกเพื่อตรวจสอบรายละเอียด</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4 rounded-lg border bg-white p-5 shadow-sm">
        <div>
          <label className="block text-sm font-medium" htmlFor="nameTh">ชื่อ (TH)</label>
          <input
            id="nameTh"
            className="mt-1 w-full rounded border p-2"
            {...register("nameTh", { required: "กรุณากรอกชื่อภาษาไทย" })}
            placeholder="เช่น นพดล ศรีสุวรรณ"
          />
          {errors.nameTh && (
            <p className="text-red-600 text-sm">{errors.nameTh.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="nameEn">ชื่อ (EN)</label>
          <input
            id="nameEn"
            className="mt-1 w-full rounded border p-2"
            {...register("nameEn", { required: "กรุณากรอกชื่อภาษาอังกฤษ" })}
            placeholder="เช่น Nopadon Srisuwan"
          />
          {errors.nameEn && (
            <p className="text-red-600 text-sm">{errors.nameEn.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">อีเมล (ถ้ามี)</label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded border p-2"
            {...register("email")}
            placeholder="example@email.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="height">ส่วนสูง (ซม.)</label>
            <input
              id="height"
              type="number"
              min={0}
              className="mt-1 w-full rounded border p-2"
              {...register("height", {
                required: "กรุณากรอกส่วนสูง",
                valueAsNumber: true,
                min: { value: 1, message: "ต้องมากกว่า 0" },
              })}
              placeholder="เช่น 172"
            />
            {errors.height && (
              <p className="text-red-600 text-sm">{String(errors.height.message)}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="age">อายุ (ปี)</label>
            <input
              id="age"
              type="number"
              min={0}
              className="mt-1 w-full rounded border p-2"
              {...register("age", {
                required: "กรุณากรอกอายุ",
                valueAsNumber: true,
                min: { value: 1, message: "ต้องมากกว่า 0" },
              })}
              placeholder="เช่น 21"
            />
            {errors.age && (
              <p className="text-red-600 text-sm">{String(errors.age.message)}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 shadow-sm"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded border px-4 py-2 hover:bg-gray-50 shadow-sm"
          >
            ล้างฟอร์ม
          </button>
        </div>
      </form>
    </main>
  );
}

