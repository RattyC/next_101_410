"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const items = [
    { href: "/", label: "Home" },
    ...segments.map((seg, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = decodeURIComponent(seg).replace(/-/g, " ");
      return { href, label };
    }),
  ];

  return (
    <nav className="text-sm py-2" aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.href}>
            {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
            {isLast ? (
              <span aria-current="page" className="text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:underline underline-offset-4">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

