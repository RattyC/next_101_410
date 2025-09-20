export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-10"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-black/10 rounded w-1/3" />
        <div className="h-4 bg-black/10 rounded w-1/2" />
        <div className="h-4 bg-black/10 rounded w-2/3" />
        <div className="h-32 bg-black/10 rounded" />
      </div>
      <span className="sr-only">Loading content…</span>
    </div>
  );
}

