"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { cn } from "@/lib/utils";
import type { Database, Document } from "@/types";

interface SubNavProps {
  sectionSlug: string;
  sectionColour: string;
}

type TabDoc = Pick<Document, "page_slug" | "title">;

export default function SubNav({ sectionSlug, sectionColour }: SubNavProps) {
  const [docs, setDocs] = useState<TabDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();

  // /wiki/[section]/[page] → pathParts[2] is page slug
  const pathParts = pathname.split("/").filter(Boolean);
  const currentPageSlug = pathParts[2] ?? null;

  useEffect(() => {
    let active = true;
    setLoading(true);

    supabase
      .from("documents")
      .select("page_slug, title")
      .eq("section_slug", sectionSlug)
      .order("title", { ascending: true })
      .then(({ data }) => {
        if (active) {
          setDocs(data ?? []);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [sectionSlug, supabase]);

  // Skeleton while loading
  if (loading) {
    return (
      <div className="border-b border-dark/10 bg-offwhite h-10 shrink-0 flex items-center px-4 lg:px-6 gap-6">
        {[80, 100, 60].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded bg-dark/10 animate-pulse shrink-0"
            style={{ width: w }}
          />
        ))}
      </div>
    );
  }

  if (docs.length === 0) {
    return <div className="border-b border-dark/10 bg-offwhite h-10 shrink-0" />;
  }

  return (
    <div className="border-b border-dark/10 bg-offwhite shrink-0">
      {/* overflow-x-auto + no-scrollbar lets mobile users swipe horizontally */}
      <nav
        className="flex overflow-x-auto px-4 lg:px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {docs.map((doc) => {
          const isActive = currentPageSlug === doc.page_slug;

          return (
            <Link
              key={doc.page_slug}
              href={`/wiki/${sectionSlug}/${doc.page_slug}`}
              className={cn(
                "relative shrink-0 px-4 py-2.5 text-sm font-medium whitespace-nowrap",
                "border-b-2 transition-colors duration-150",
                isActive
                  ? "text-dark"
                  : "border-transparent text-dark/45 hover:text-dark hover:border-dark/20"
              )}
              style={isActive ? { borderBottomColor: sectionColour } : undefined}
            >
              {doc.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
