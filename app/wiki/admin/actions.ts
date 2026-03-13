"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import type { UserRole } from "@/types";

export async function updateUserRole(userId: string, role: UserRole) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabaseAdmin as any)
    .from("users")
    .update({ role })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
