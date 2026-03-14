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

    return () => { active = false; };
  }, [sectionSlug, supabase]);

  if (loading) {
    return (
      <div
        className="border-b h-11 shrink-0 flex items-center px-4 lg:px-6 gap-6 animate-pulse"
        style={{ backgroundColor: "#F4F0E8", borderBottomColor: "#E8E0D4" }}
      >
        {[80, 110, 65].map((w, i) => (
          <div key={i} className="h-2.5 bg-muted/20 shrink-0" style={{ width: w }} />
        ))}
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div
        className="border-b h-11 shrink-0"
        style={{ backgroundColor: "#F4F0E8", borderBottomColor: "#E8E0D4" }}
      />
    );
  }

  return (
    <div
      className="border-b shrink-0"
      style={{ backgroundColor: "#F4F0E8", borderBottomColor: "#E8E0D4" }}
    >
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
                "relative shrink-0 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] whitespace-nowrap",
                "border-b-2 transition-colors duration-150",
                isActive ? "" : "border-transparent text-muted hover:border-muted/30"
              )}
              style={isActive ? { color: sectionColour, borderBottomColor: sectionColour } : undefined}
            >
              {doc.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
