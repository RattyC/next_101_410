import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: {
    default: "CS Portfolio",
    template: "%s · CS Portfolio",
  },
  description: "Showcase, members, and updates from the CS team.",
  metadataBase: new URL("https://example.com"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "CS Portfolio",
    description: "Showcase, members, and updates from the CS team.",
    type: "website",
    url: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <a href="#content" className="sr-only focus:not-sr-only focus:block p-2">Skip to content</a>
        <Navbar />
        <main id="content" className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs />
          {children}
        </main>
        <footer className="mt-10 border-t bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} Computer Science — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
