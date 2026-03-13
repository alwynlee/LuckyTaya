"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Database, Section } from "@/types";

// ── Text extraction from ProseMirror JSON ─────────────────────────────────────

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (n.type === "text" && typeof n.text === "string") return n.text;
  const kids = n.content as unknown[] | undefined;
  return kids ? kids.map(extractText).join(" ") : "";
}

function getExcerpt(
  content: Record<string, unknown>,
  query: string,
  maxLen = 130
): string {
  const full = extractText(content).replace(/\s+/g, " ").trim();
  if (!full) return "";

  const lower = full.toLowerCase();
  const qi = lower.indexOf(query.toLowerCase().trim());

  if (qi === -1) {
    return full.length > maxLen ? full.slice(0, maxLen).trimEnd() + "…" : full;
  }

  // Show context window around the matched term
  const start = Math.max(0, qi - 35);
  const end = Math.min(full.length, qi + query.length + 95);
  return (
    (start > 0 ? "…" : "") +
    full.slice(start, end).trim() +
    (end < full.length ? "…" : "")
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface SearchResult {
  page_slug: string;
  title: string;
  section_slug: string;
  content: Record<string, unknown>;
}

// ── Single result row ─────────────────────────────────────────────────────────

function ResultRow({
  result,
  section,
  query,
  isActive,
  onClick,
}: {
  result: SearchResult;
  section: Section | undefined;
  query: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const excerpt = getExcerpt(result.content, query);

  return (
    <Link
      href={`/wiki/${result.section_slug}/${result.page_slug}`}
      onClick={onClick}
      className={cn(
        "flex flex-col gap-1 px-4 py-3 border-b border-dark/6 last:border-0",
        "hover:bg-dark/4 transition-colors",
        isActive && "bg-yellow/10"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {section && (
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: section.colour }}
          />
        )}
        <span className="text-sm font-semibold text-dark truncate flex-1">
          {result.title}
        </span>
        {section && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-dark/35 shrink-0">
            {section.title}
          </span>
        )}
      </div>
      {excerpt && (
        <p className="text-xs text-dark/45 line-clamp-2 leading-relaxed pl-4">
          {excerpt}
        </p>
      )}
    </Link>
  );
}

// ── Dropdown panel ────────────────────────────────────────────────────────────

function ResultsDropdown({
  results,
  query,
  activeIndex,
  sectionMap,
  onSelect,
  forwardedRef,
  className,
}: {
  results: SearchResult[];
  query: string;
  activeIndex: number;
  sectionMap: Map<string, Section>;
  onSelect: () => void;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div
      ref={forwardedRef}
      className={cn(
        "bg-white rounded-xl border border-dark/12 overflow-y-auto",
        "shadow-[0_8px_40px_rgba(2,17,10,0.13)]",
        className
      )}
    >
      {results.length === 0 ? (
        <p className="text-sm text-dark/40 px-4 py-8 text-center">
          No results found.
        </p>
      ) : (
        results.map((result, i) => (
          <ResultRow
            key={`${result.section_slug}/${result.page_slug}`}
            result={result}
            section={sectionMap.get(result.section_slug)}
            query={query}
            isActive={activeIndex === i}
            onClick={onSelect}
          />
        ))
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
// Renders as a React Fragment — no wrapping DOM element — so the parent
// header's flex layout is not disturbed.

interface SearchBarProps {
  sections: Section[];
}

export default function SearchBar({ sections }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const sectionMap = new Map(sections.map((s) => [s.slug, s]));

  // ── Search (debounced 280 ms) ────────────────────────────────────────────
  const doSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (trimmed.length < 2) {
        setResults([]);
        setOpen(false);
        return;
      }

      setLoading(true);
      try {
        // Attempt FTS via the generated search_vector column.
        // search_vector is added by supabase/search.sql — falls back to ilike
        // if the migration hasn't been run yet (column missing = Supabase error).
        //
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: ftsData, error: ftsError } = await (supabase as any)
          .from("documents")
          .select("page_slug, title, section_slug, content")
          .textSearch("search_vector", trimmed, {
            type: "plain",
            config: "english",
          })
          .limit(6);

        if (!ftsError && ftsData?.length) {
          setResults(ftsData as SearchResult[]);
          setOpen(true);
          return;
        }

        // Fallback: title substring search (always available)
        const { data: ilikeData } = await supabase
          .from("documents")
          .select("page_slug, title, section_slug, content")
          .ilike("title", `%${trimmed}%`)
          .limit(6);

        setResults((ilikeData as SearchResult[]) ?? []);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    const t = setTimeout(() => doSearch(query), 280);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  // ── Auto-focus input when mobile expands ────────────────────────────────
  useEffect(() => {
    if (mobileExpanded) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [mobileExpanded]);

  // ── Close dropdown on outside click ─────────────────────────────────────
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside =
        inputRef.current?.contains(t) ||
        desktopDropdownRef.current?.contains(t) ||
        mobileDropdownRef.current?.contains(t) ||
        mobileOverlayRef.current?.contains(t);
      if (!inside) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        if (mobileExpanded) closeMobile();
        return;
      case "ArrowDown":
        if (!open) return;
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        return;
      case "ArrowUp":
        if (!open) return;
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        return;
      case "Enter":
        if (activeIndex >= 0 && results[activeIndex]) {
          e.preventDefault();
          const r = results[activeIndex];
          router.push(`/wiki/${r.section_slug}/${r.page_slug}`);
          handleSelect();
        }
        return;
    }
  };

  const closeMobile = () => {
    setMobileExpanded(false);
    setQuery("");
    setOpen(false);
    setResults([]);
    setActiveIndex(-1);
  };

  const handleSelect = () => {
    setOpen(false);
    setQuery("");
    setMobileExpanded(false);
    setActiveIndex(-1);
  };

  const clearQuery = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  };

  // ── Shared input element ─────────────────────────────────────────────────
  const inputEl = (
    <input
      ref={inputRef}
      type="search"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setActiveIndex(-1);
      }}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        if (query.length >= 2 && results.length > 0) setOpen(true);
      }}
      placeholder="Search…"
      autoComplete="off"
      spellCheck={false}
      className="bg-transparent outline-none text-sm text-dark placeholder:text-dark/35 w-full min-w-0"
    />
  );

  return (
    <>
      {/* ── Mobile: icon button (hidden sm+) ──────────────────────────────── */}
      {!mobileExpanded && (
        <button
          onClick={() => setMobileExpanded(true)}
          aria-label="Open search"
          className="sm:hidden p-1.5 rounded-md text-dark/50 hover:text-dark hover:bg-dark/6 transition-colors"
        >
          <Search className="w-[18px] h-[18px]" />
        </button>
      )}

      {/* ── Mobile: full-width overlay (absolute — covers header) ─────────── */}
      {mobileExpanded && (
        <div
          ref={mobileOverlayRef}
          className="sm:hidden absolute inset-0 z-20 flex items-center gap-2 px-3 bg-offwhite border-b border-dark/10"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 shrink-0 text-dark/35 animate-spin" />
          ) : (
            <Search className="w-4 h-4 shrink-0 text-dark/40" />
          )}

          {inputEl}

          <button
            onClick={closeMobile}
            aria-label="Close search"
            className="p-1.5 rounded-md text-dark/40 hover:text-dark hover:bg-dark/8 shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Mobile: results dropdown (absolute — below header) ────────────── */}
      {mobileExpanded && open && (
        <ResultsDropdown
          results={results}
          query={query}
          activeIndex={activeIndex}
          sectionMap={sectionMap}
          onSelect={handleSelect}
          forwardedRef={mobileDropdownRef}
          className={cn(
            "sm:hidden absolute top-full left-0 right-0 z-30",
            "rounded-none border-x-0 border-t-0 rounded-b-xl",
            "max-h-[60vh]"
          )}
        />
      )}

      {/* ── Desktop: inline search field + dropdown (hidden on mobile) ─────── */}
      <div className="relative hidden sm:block">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg",
            "border border-dark/15 bg-white/70",
            "focus-within:border-dark/35 focus-within:bg-white",
            "transition-[width,border-color,background-color] duration-200",
            "w-[190px] focus-within:w-[260px]"
          )}
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 text-dark/35 animate-spin shrink-0" />
          ) : (
            <Search className="w-3.5 h-3.5 text-dark/35 shrink-0" />
          )}

          {inputEl}

          {query && (
            <button
              onClick={clearQuery}
              aria-label="Clear search"
              className="shrink-0 text-dark/30 hover:text-dark/60 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Desktop dropdown */}
        {open && (
          <ResultsDropdown
            results={results}
            query={query}
            activeIndex={activeIndex}
            sectionMap={sectionMap}
            onSelect={handleSelect}
            forwardedRef={desktopDropdownRef}
            className="absolute top-full right-0 mt-2 w-[400px] z-50 max-h-[420px]"
          />
        )}
      </div>
    </>
  );
}
