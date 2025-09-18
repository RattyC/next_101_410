import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send us a quick message.",
};

export default function ContactPage() {
  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <ContactForm />
    </main>
  );
}
