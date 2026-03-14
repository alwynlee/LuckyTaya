export default function WikiHomeLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-pulse">
      {/* Title */}
      <div className="space-y-2.5">
        <div className="h-8 w-72 bg-dark/8" />
        <div className="h-4 w-[420px] max-w-full bg-dark/6" />
      </div>

      {/* Section cards */}
      <section>
        <div className="h-2.5 w-16 bg-dark/8 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-stroke p-4 sm:p-5 space-y-4"
            >
              <div className="w-10 h-10 bg-dark/8" />
              <div className="space-y-2">
                <div className="h-4 w-28 bg-dark/10" />
                <div className="h-3 w-20 bg-dark/6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently updated */}
      <section>
        <div className="h-2.5 w-28 bg-dark/8 mb-4" />
        <div className="bg-white border border-stroke divide-y divide-stroke overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-2 h-2 rounded-full bg-dark/12 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-40 bg-dark/10" />
                <div className="h-3 w-24 bg-dark/6" />
              </div>
              <div className="h-3 w-16 bg-dark/8 shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
