export default function AdminLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-dark/10" />
        <div className="h-4 w-80 bg-dark/6" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-stroke px-5 py-4 space-y-2"
          >
            <div className="h-8 w-10 bg-dark/10" />
            <div className="h-3 w-20 bg-dark/6" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-stroke overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-stroke flex gap-4">
          <div className="h-3 w-36 bg-dark/12" />
          <div className="h-3 w-12 bg-dark/12 ml-auto" />
          <div className="h-3 w-12 bg-dark/12" />
        </div>
        {/* Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="px-5 py-4 border-b border-stroke last:border-0 flex items-center gap-4"
          >
            <div className="h-3.5 w-44 bg-dark/8 flex-1" />
            <div className="h-5 w-16 bg-dark/8" />
            <div className="h-5 w-9 bg-dark/8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
