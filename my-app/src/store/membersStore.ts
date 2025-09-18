"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Member } from "@/data/members";

export type NewMemberInput = {
  name: string;      // Thai name
  nameEn: string;    // English name
  email?: string;
  heightCm: number;
  ageYears: number;
};

type MembersState = {
  members: Member[];
  addMember: (data: NewMemberInput) => string; // returns id
  clear: () => void;
};

function genId() {
  return (
    "M" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  ).toUpperCase();
}

export const useMembers = create<MembersState>()(
  persist(
    (set) => ({
      members: [],
      addMember: (data) => {
        const id = genId();
        const record: Member = {
          id,
          name: data.name,
          nameEn: data.nameEn,
          role: "นักศึกษา",
          bio: "Added via form",
          heightCm: data.heightCm,
          ageYears: data.ageYears,
          weightKg: 0,
          email: data.email,
        };
        set((s) => ({ members: [record, ...s.members] }));
        return id;
      },
      clear: () => set({ members: [] }),
    }),
    { name: "members-store", version: 1 }
  )
);

