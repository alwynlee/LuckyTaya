import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import WikiEditor from "@/components/WikiEditor";
import type { Database } from "@/types";

interface PageProps {
  params: { section: string; page: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("documents")
    .select("title")
    .eq("section_slug", params.section)
    .eq("page_slug", params.page)
    .single();

  const row = data as { title: string } | null;
  return { title: row ? `${row.title} — Wiki` : "Wiki" };
}

export default async function WikiPage({ params }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const [{ data: documentData }, { data: sectionRaw }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, section_slug, page_slug, title, content, updated_at, updated_by")
      .eq("section_slug", params.section)
      .eq("page_slug", params.page)
      .single(),
    supabase
      .from("sections")
      .select("title")
      .eq("slug", params.section)
      .single(),
  ]);

  const section = sectionRaw as { title: string } | null;

  if (!documentData) notFound();

  return (
    <WikiEditor
      document={documentData}
      sectionTitle={section?.title ?? undefined}
    />
  );
}
