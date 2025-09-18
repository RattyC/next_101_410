import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="inline-block px-3 py-2 rounded bg-black text-white dark:bg-white dark:text-black text-sm"
      >
        Back to Home
      </Link>
    </main>
  );
}

