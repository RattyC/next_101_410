import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about our mission and team.",
};

export default function AboutPage() {
  return (
    <section className="py-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
          We build tools and experiences that help students and teams showcase
          their work clearly and professionally.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 p-5">
          <h2 className="text-lg font-medium">What we do</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            From simple portfolio pages to small admin consoles, our focus is
            on clean design, solid accessibility, and pragmatic performance.
          </p>
        </div>
        <div className="rounded-lg border border-black/10 p-5">
          <h2 className="text-lg font-medium">How we work</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            We prefer lightweight, well-structured code over heavy frameworks;
            simple patterns you can read, extend, and trust.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-black/10 p-5">
        <h2 className="text-lg font-medium">Get in touch</h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Have feedback or ideas? Head to the Contact page and send us a note.
        </p>
      </div>
    </section>
  );
}
