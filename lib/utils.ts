import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving conflicts via tailwind-merge
 * and supporting conditional classes via clsx.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-teal text-offwhite", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
