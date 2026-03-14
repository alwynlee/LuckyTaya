export default function WikiPageLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      {/* Title + button */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="h-8 w-64 bg-dark/10 rounded-lg" />
        <div className="h-9 w-16 bg-dark/8 rounded-lg shrink-0" />
      </div>

      {/* Paragraph */}
      <div className="space-y-2.5">
        <div className="h-4 w-full bg-dark/8 rounded" />
        <div className="h-4 w-[92%] bg-dark/8 rounded" />
        <div className="h-4 w-[78%] bg-dark/8 rounded" />
        <div className="h-4 w-full bg-dark/8 rounded" />
        <div className="h-4 w-[86%] bg-dark/8 rounded" />
      </div>

      {/* Heading */}
      <div className="mt-8 mb-4 h-6 w-44 bg-dark/10 rounded" />

      {/* Paragraph */}
      <div className="space-y-2.5">
        <div className="h-4 w-full bg-dark/8 rounded" />
        <div className="h-4 w-[88%] bg-dark/8 rounded" />
        <div className="h-4 w-[65%] bg-dark/8 rounded" />
      </div>

      {/* Table */}
      <div className="mt-8 rounded-xl border border-dark/8 overflow-hidden">
        <div className="bg-dark/5 px-4 py-3 grid grid-cols-3 gap-4">
          <div className="h-3.5 bg-dark/15 rounded" />
          <div className="h-3.5 bg-dark/15 rounded" />
          <div className="h-3.5 bg-dark/15 rounded" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="px-4 py-3 grid grid-cols-3 gap-4 border-t border-dark/6"
          >
            <div className="h-3 bg-dark/8 rounded" />
            <div className="h-3 bg-dark/8 rounded" />
            <div className="h-3 bg-dark/8 rounded" />
          </div>
        ))}
      </div>

      {/* Heading 2 */}
      <div className="mt-8 mb-4 h-6 w-36 bg-dark/10 rounded" />

      {/* Bullet list */}
      <div className="space-y-2.5 pl-4">
        {[80, 60, 72, 55].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-dark/15 shrink-0" />
            <div className={`h-3.5 bg-dark/8 rounded`} style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>

      {/* Last updated */}
      <div className="mt-10 pt-4 border-t border-dark/8">
        <div className="h-3 w-52 bg-dark/6 rounded" />
      </div>
    </div>
  );
}
