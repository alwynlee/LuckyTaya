"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useToast, type ToastType } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

const config: Record<ToastType, { Icon: React.ElementType; iconClass: string }> = {
  success: { Icon: CheckCircle2, iconClass: "text-teal" },
  error:   { Icon: XCircle,      iconClass: "text-red" },
  info:    { Icon: Info,          iconClass: "text-offwhite/50" },
};

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => {
        const { Icon, iconClass } = config[toast.type];
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3",
              "bg-dark text-offwhite shadow-xl border border-white/10",
              "min-w-[240px] max-w-[360px] toast-enter"
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0", iconClass)} />
            <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 p-1 text-offwhite/40 hover:text-offwhite hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
