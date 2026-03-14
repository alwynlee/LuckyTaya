import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

import DynamicIcon from "@/components/DynamicIcon";
import { cn } from "@/lib/utils";
import type { Database, Section } from "@/types";

export const metadata: Metadata = {
  title: "Home — iGaming Philippines Internal Wiki",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type DocSummary = {
  section_slug: string;
  page_slug: string;
  title: string;
  updated_at: string;
  updated_by: string;
};

type SectionStat = { count: number; lastUpdatedAt: string };

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({ section, stat }: { section: Section; stat: SectionStat | undefined }) {
  const tintBg = section.colour + "14"; // ~8% opacity

  const lastUpdated = stat?.lastUpdatedAt
    ? new Date(stat.lastUpdatedAt).toLocaleDateString("en-PH", { month: "short", day: "numeric" })
    : null;

  return (
    <Link
      href={`/wiki/${section.slug}`}
      className="group flex flex-col gap-4 p-4 sm:p-5 bg-white border border-stroke hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-150"
      style={{ borderTop: `3px solid ${section.colour}` }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0"
        style={{ backgroundColor: tintBg }}
      >
        <DynamicIcon name={section.icon} className="w-5 h-5" style={{ color: section.colour }} />
      </div>

      {/* Title + stats */}
      <div>
        <p
          className="font-semibold text-dark text-sm sm:text-[15px] leading-snug transition-colors"
          style={{ "--hover-color": section.colour } as React.CSSProperties}
        >
          {section.title}
        </p>
        <p className="text-xs text-muted font-light mt-1">
          {stat?.count ?? 0}&nbsp;{stat?.count === 1 ? "page" : "pages"}
          {lastUpdated && <> · Updated {lastUpdated}</>}
        </p>
      </div>
    </Link>
  );
}

// ── Recently Updated row ──────────────────────────────────────────────────────

function RecentRow({ doc, section }: { doc: DocSummary; section: Section | undefined }) {
  const date = new Date(doc.updated_at).toLocaleDateString("en-PH", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <Link
      href={`/wiki/${doc.section_slug}/${doc.page_slug}`}
      className="group flex items-center gap-4 px-5 py-3.5 hover:bg-surface transition-colors"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: section?.colour ?? "#0B704E" }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-dark group-hover:text-teal transition-colors truncate">
          {doc.title}
        </p>
        <p className="text-xs text-muted mt-0.5 truncate">
          {section && <span className="font-medium">{section.title}</span>}
          {doc.updated_by && <span className="text-dark/30"> · by {doc.updated_by}</span>}
        </p>
      </div>
      <time dateTime={doc.updated_at} className="text-xs text-muted font-medium shrink-0 tabular-nums">
        {date}
      </time>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function WikiHomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = supabase as any;
  const [{ data: sectionsRaw }, { data: docsRaw }] = await Promise.all([
    s.from("sections").select("id, slug, title, icon, colour, display_order").order("display_order", { ascending: true }),
    s.from("documents").select("section_slug, page_slug, title, updated_at, updated_by").order("updated_at", { ascending: false }),
  ]);

  const allSections = (sectionsRaw as Section[] | null) ?? [];
  const allDocs = ((docsRaw as DocSummary[] | null) ?? []) as DocSummary[];

  const sectionStats = new Map<string, SectionStat>();
  for (const doc of allDocs) {
    const existing = sectionStats.get(doc.section_slug);
    if (!existing) {
      sectionStats.set(doc.section_slug, { count: 1, lastUpdatedAt: doc.updated_at });
    } else {
      existing.count++;
    }
  }

  const sectionMap = new Map(allSections.map((s) => [s.slug, s]));
  const recentDocs = allDocs.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-dark leading-tight">
          iGaming Philippines — Internal Wiki
        </h1>
        <p className="mt-2 text-sm text-muted font-light max-w-xl leading-relaxed">
          Your central knowledge base for operations, KYC, VIP management,
          fraud prevention, and affiliate partnerships.
        </p>
      </div>

      {/* Section cards */}
      {allSections.length > 0 && (
        <section aria-label="Sections">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted mb-4">
            Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {allSections.map((section) => (
              <SectionCard key={section.slug} section={section} stat={sectionStats.get(section.slug)} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Updated */}
      {recentDocs.length > 0 && (
        <section aria-label="Recently updated">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted mb-4">
            Recently Updated
          </h2>
          <div className="bg-white border border-stroke divide-y divide-stroke overflow-hidden">
            {recentDocs.map((doc) => (
              <RecentRow
                key={`${doc.section_slug}/${doc.page_slug}`}
                doc={doc}
                section={sectionMap.get(doc.section_slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {allSections.length === 0 && (
        <div className={cn("flex flex-col items-center justify-center py-24 text-center")}>
          <p className="text-2xl font-bold text-dark/20">No content yet</p>
          <p className="mt-2 text-sm text-muted">
            Run seed.sql in the Supabase SQL Editor to populate the wiki.
          </p>
        </div>
      )}

    </div>
  );
}
