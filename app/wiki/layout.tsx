import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import WikiShell from "@/components/WikiShell";
import type { Database } from "@/types";

export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: sections } = await supabase
    .from("sections")
    .select("id, slug, title, icon, colour, display_order")
    .order("display_order", { ascending: true });

  return <WikiShell sections={sections ?? []}>{children}</WikiShell>;
}
