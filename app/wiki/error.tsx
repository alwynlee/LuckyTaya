"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function WikiError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center mb-5">
        <AlertTriangle className="w-6 h-6 text-red" strokeWidth={1.75} />
      </div>
      <h2 className="text-xl font-bold text-dark">Something went wrong</h2>
      <p className="mt-2 text-sm text-dark/50 max-w-sm leading-relaxed">
        We couldn&apos;t load this page. This might be a temporary issue — please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-dark text-offwhite text-sm font-semibold hover:bg-dark/85 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  );
}
