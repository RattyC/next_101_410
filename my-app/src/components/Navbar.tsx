"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between py-3">
        <Link href="/" className="font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-black/30 rounded">
          CS Portfolio
        </Link>
        <button
          className="sm:hidden px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav className="hidden sm:flex gap-2 items-center" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "px-3 py-1.5 rounded text-sm underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30 " +
                  (active
                    ? "font-semibold bg-black/5 underline"
                    : "hover:bg-black/5")
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {open && (
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 sm:hidden flex flex-col gap-2 pb-3" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black/30 " +
                  (active
                    ? "font-semibold bg-black/5"
                    : "hover:bg-black/5")
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
