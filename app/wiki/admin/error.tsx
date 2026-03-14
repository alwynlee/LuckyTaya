"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-12 h-12 bg-red/10 flex items-center justify-center mb-5">
          <AlertTriangle className="w-6 h-6 text-red" strokeWidth={1.75} />
        </div>
        <h2 className="text-xl font-bold text-dark">Failed to load admin panel</h2>
        <p className="mt-2 text-sm text-dark/50 max-w-sm leading-relaxed">
          There was a problem loading user data. Try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="mt-6 flex items-center gap-2 px-4 py-2.5 bg-dark text-offwhite text-sm font-semibold hover:bg-dark/85 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try again
        </button>
      </div>
    </div>
  );
}
