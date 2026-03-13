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

type SectionStat = {
  count: number;
  lastUpdatedAt: string;
};

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({
  section,
  stat,
}: {
  section: Section;
  stat: SectionStat | undefined;
}) {
  // 8-digit hex = RRGGBBAA; "1A" ≈ 10 % opacity tint for the icon container
  const tintBg = section.colour + "1A";

  const lastUpdated = stat?.lastUpdatedAt
    ? new Date(stat.lastUpdatedAt).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/wiki/${section.slug}`}
      className={cn(
        "group flex flex-col gap-4 p-4 sm:p-5 rounded-xl",
        "bg-white border border-dark/8",
        "hover:border-yellow hover:shadow-[0_0_0_3px_rgba(255,225,0,0.22)]",
        "transition-all duration-150"
      )}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: tintBg }}
      >
        <DynamicIcon
          name={section.icon}
          className="w-5 h-5"
          style={{ color: section.colour }}
        />
      </div>

      {/* Title + stats */}
      <div>
        <p className="font-bold text-dark text-sm sm:text-[15px] leading-snug group-hover:text-teal transition-colors">
          {section.title}
        </p>

        <div className="flex items-center gap-2 mt-1.5 text-xs text-dark/40 font-medium">
          <span>
            {stat?.count ?? 0}&nbsp;{stat?.count === 1 ? "page" : "pages"}
          </span>

          {lastUpdated && (
            <>
              <span className="w-px h-3 bg-dark/15 shrink-0" />
              <span>Updated {lastUpdated}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Recently Updated row ──────────────────────────────────────────────────────

function RecentRow({
  doc,
  section,
}: {
  doc: DocSummary;
  section: Section | undefined;
}) {
  const date = new Date(doc.updated_at).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/wiki/${doc.section_slug}/${doc.page_slug}`}
      className="group flex items-center gap-4 px-5 py-3.5 hover:bg-dark/3 transition-colors"
    >
      {/* Section colour dot */}
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: section?.colour ?? "#0B704E" }}
      />

      {/* Doc info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-dark group-hover:text-teal transition-colors truncate">
          {doc.title}
        </p>
        <p className="text-xs text-dark/40 mt-0.5 truncate">
          {section && <span className="font-medium">{section.title}</span>}
          {doc.updated_by && (
            <span className="text-dark/30"> · by {doc.updated_by}</span>
          )}
        </p>
      </div>

      {/* Timestamp */}
      <time
        dateTime={doc.updated_at}
        className="text-xs text-dark/35 font-medium shrink-0 tabular-nums"
      >
        {date}
      </time>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function WikiHomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch sections + all doc summaries in parallel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = supabase as any;
  const [{ data: sectionsRaw }, { data: docsRaw }] = await Promise.all([
    s.from("sections")
      .select("id, slug, title, icon, colour, display_order")
      .order("display_order", { ascending: true }),
    s.from("documents")
      .select("section_slug, page_slug, title, updated_at, updated_by")
      .order("updated_at", { ascending: false }),
  ]);
  const sections = sectionsRaw as Section[] | null;
  const docs = docsRaw as DocSummary[] | null;

  const allSections = sections ?? [];
  const allDocs = (docs ?? []) as DocSummary[];

  // Build per-section stats. allDocs is desc by updated_at, so the first doc
  // encountered per section is the most recently updated one.
  const sectionStats = new Map<string, SectionStat>();
  for (const doc of allDocs) {
    const s = sectionStats.get(doc.section_slug);
    if (!s) {
      sectionStats.set(doc.section_slug, { count: 1, lastUpdatedAt: doc.updated_at });
    } else {
      s.count++;
    }
  }

  const sectionMap = new Map(allSections.map((s) => [s.slug, s]));
  const recentDocs = allDocs.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* ── Welcome ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-dark leading-tight">
          iGaming Philippines — Internal Wiki
        </h1>
        <p className="mt-2 text-sm text-dark/50 max-w-xl leading-relaxed">
          Your central knowledge base for operations, KYC, VIP management,
          fraud prevention, and affiliate partnerships.
        </p>
      </div>

      {/* ── Section cards ────────────────────────────────────────────────── */}
      {allSections.length > 0 && (
        <section aria-label="Sections">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-dark/35 mb-4">
            Sections
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {allSections.map((section) => (
              <SectionCard
                key={section.slug}
                section={section}
                stat={sectionStats.get(section.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Recently Updated ─────────────────────────────────────────────── */}
      {recentDocs.length > 0 && (
        <section aria-label="Recently updated">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-dark/35 mb-4">
            Recently Updated
          </h2>
          <div className="bg-white rounded-xl border border-dark/8 divide-y divide-dark/6 overflow-hidden">
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

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {allSections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-2xl font-bold text-dark/20">No content yet</p>
          <p className="mt-2 text-sm text-dark/40">
            Run seed.sql in the Supabase SQL Editor to populate the wiki.
          </p>
        </div>
      )}

    </div>
  );
}
