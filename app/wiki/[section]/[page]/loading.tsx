export default function WikiPageLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-dark/8 border-b border-dark/10 shrink-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="h-2.5 w-20 bg-dark/15 mb-3" />
          <div className="flex items-start justify-between gap-4">
            <div className="h-8 w-64 bg-dark/20" />
            <div className="h-9 w-16 bg-dark/15 shrink-0" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Paragraph */}
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-dark/8" />
          <div className="h-4 w-[92%] bg-dark/8" />
          <div className="h-4 w-[78%] bg-dark/8" />
          <div className="h-4 w-full bg-dark/8" />
          <div className="h-4 w-[86%] bg-dark/8" />
        </div>

        {/* Heading */}
        <div className="mt-8 mb-4 h-6 w-44 bg-dark/10" />

        {/* Paragraph */}
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-dark/8" />
          <div className="h-4 w-[88%] bg-dark/8" />
          <div className="h-4 w-[65%] bg-dark/8" />
        </div>

        {/* Table */}
        <div className="mt-8 border border-stroke overflow-hidden">
          <div className="bg-surface px-4 py-3 grid grid-cols-3 gap-4">
            <div className="h-3.5 bg-dark/15" />
            <div className="h-3.5 bg-dark/15" />
            <div className="h-3.5 bg-dark/15" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="px-4 py-3 grid grid-cols-3 gap-4 border-t border-stroke"
            >
              <div className="h-3 bg-dark/8" />
              <div className="h-3 bg-dark/8" />
              <div className="h-3 bg-dark/8" />
            </div>
          ))}
        </div>

        {/* Heading 2 */}
        <div className="mt-8 mb-4 h-6 w-36 bg-dark/10" />

        {/* Bullet list */}
        <div className="space-y-2.5 pl-4">
          {[80, 60, 72, 55].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-dark/15 shrink-0" />
              <div className="h-3.5 bg-dark/8" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>

        {/* Last updated */}
        <div className="mt-10 pt-4 border-t border-stroke">
          <div className="h-3 w-52 bg-dark/6" />
        </div>
      </div>
    </div>
  );
}
