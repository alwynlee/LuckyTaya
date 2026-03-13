import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import type { Database } from "@/types";

/** Redirect /wiki/[section] → first page of that section. */
export default async function SectionIndexPage({
  params,
}: {
  params: { section: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("documents")
    .select("page_slug")
    .eq("section_slug", params.section)
    .order("title", { ascending: true })
    .limit(1)
    .single();

  const doc = data as { page_slug: string } | null;
  if (!doc) notFound();

  redirect(`/wiki/${params.section}/${doc.page_slug}`);
}
