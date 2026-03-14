import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { supabaseAdmin } from "@/lib/supabase-admin";
import UserTable from "./UserTable";
import type { Database, User } from "@/types";

export const metadata: Metadata = {
  title: "User Management — Wiki Admin",
};

export default async function AdminPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // ── Auth + role guard ─────────────────────────────────────────────────────
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profileRaw } = await (supabase as any)
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();
  const profile = profileRaw as { role: string } | null;

  if (!profile || profile.role !== "admin") redirect("/wiki");

  // ── Fetch all auth users via service role ─────────────────────────────────
  const {
    data: { users: authUsers },
  } = await supabaseAdmin.auth.admin.listUsers();

  // ── Fetch roles from public.users table ───────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profileRowsRaw } = await (supabaseAdmin as any)
    .from("users")
    .select("id, role");
  const profileRows = profileRowsRaw as Array<{ id: string; role: string }> | null;

  const roleMap = new Map(profileRows?.map((p) => [p.id, p.role]) ?? []);

  // Merge auth users with roles
  const users: User[] = authUsers.map((u) => ({
    id: u.id,
    email: u.email ?? "(no email)",
    role: (roleMap.get(u.id) as User["role"]) ?? "viewer",
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">User Management</h1>
        <p className="mt-1 text-sm text-dark/50">
          Toggle admin access for registered users. Changes take effect immediately.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total users", value: users.length },
          {
            label: "Admins",
            value: users.filter((u) => u.role === "admin").length,
          },
          {
            label: "Viewers",
            value: users.filter((u) => u.role === "viewer").length,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-stroke px-5 py-4"
          >
            <p className="text-2xl font-bold text-dark">{value}</p>
            <p className="text-xs text-dark/45 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <UserTable users={users} />
    </div>
  );
}
