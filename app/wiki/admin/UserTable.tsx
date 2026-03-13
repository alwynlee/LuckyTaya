"use client";

import { useTransition } from "react";
import { updateUserRole } from "./actions";
import { cn } from "@/lib/utils";
import type { User, UserRole } from "@/types";

interface UserTableProps {
  users: User[];
}

// ── Toggle switch ─────────────────────────────────────────────────────────────

function RoleToggle({
  userId,
  role,
  onToggled,
}: {
  userId: string;
  role: UserRole;
  onToggled: (id: string, newRole: UserRole) => void;
}) {
  const [pending, startTransition] = useTransition();
  const isAdmin = role === "admin";

  const handleClick = () => {
    const newRole: UserRole = isAdmin ? "viewer" : "admin";
    startTransition(async () => {
      await updateUserRole(userId, newRole);
      onToggled(userId, newRole);
    });
  };

  return (
    <button
      role="switch"
      aria-checked={isAdmin}
      onClick={handleClick}
      disabled={pending}
      title={`Switch to ${isAdmin ? "viewer" : "admin"}`}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-teal/40 focus:ring-offset-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isAdmin ? "bg-teal" : "bg-dark/20"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm",
          "transition-transform duration-200",
          isAdmin ? "translate-x-[18px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

// ── Main table ────────────────────────────────────────────────────────────────

export default function UserTable({ users: initialUsers }: UserTableProps) {
  // Optimistic local state — updated immediately on toggle
  const [users, setUsers] = useState(initialUsers);

  const handleToggled = (id: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  if (users.length === 0) {
    return (
      <p className="text-sm text-dark/40 py-8 text-center">No users found.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-dark/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark/10 bg-dark/4">
            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-dark/45">
              Email
            </th>
            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-dark/45">
              Role
            </th>
            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-dark/45">
              Admin access
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr
              key={user.id}
              className={cn(
                "border-b border-dark/6 last:border-0 transition-colors",
                i % 2 === 0 ? "bg-white" : "bg-offwhite"
              )}
            >
              <td className="px-5 py-3.5 text-dark/80 font-medium">{user.email}</td>
              <td className="px-5 py-3.5">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide border",
                    user.role === "admin"
                      ? "bg-teal/12 text-teal border-teal/25"
                      : "bg-dark/8 text-dark/50 border-dark/15"
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <RoleToggle
                  userId={user.id}
                  role={user.role}
                  onToggled={handleToggled}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// useState import needed in client component
import { useState } from "react";
