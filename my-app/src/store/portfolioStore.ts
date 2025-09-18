"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewPortfolio, Portfolio } from "@/types/portfolio";

type PortfolioState = {
  portfolios: Portfolio[];
  add: (item: NewPortfolio) => string; // returns id
  update: (id: string, patch: Partial<Portfolio>) => void;
  remove: (id: string) => void;
  clear: () => void;
  getById: (id: string) => Portfolio | undefined;
};

function genId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolios: [],
      add: (item) => {
        const id = genId();
        const record: Portfolio = { ...item, id, createdAt: Date.now() };
        set((s) => ({ portfolios: [record, ...s.portfolios] }));
        return id;
      },
      update: (id, patch) => {
        set((s) => ({
          portfolios: s.portfolios.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        }));
      },
      remove: (id) => {
        set((s) => ({ portfolios: s.portfolios.filter((p) => p.id !== id) }));
      },
      clear: () => set({ portfolios: [] }),
      getById: (id) => get().portfolios.find((p) => p.id === id),
    }),
    {
      name: "portfolio-store",
      version: 1,
    }
  )
);

