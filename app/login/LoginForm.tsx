"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AlertCircle, BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import type { Database } from "@/types";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      // Surface a consistent message — never leak whether it was email vs password
      setError("Invalid email or password. Please check your credentials and try again.");
      setLoading(false);
      return;
    }

    // Honour ?redirectTo= set by middleware, fall back to /wiki
    const redirectTo = searchParams.get("redirectTo") ?? "/wiki";
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">

        {/* ── Card ────────────────────────────────────────────── */}
        <div className="bg-offwhite rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.45)] overflow-hidden">

          {/* Card header */}
          <div className="px-8 pt-10 pb-7 text-center border-b border-dark/10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal mb-5 shadow-sm">
              <BookOpen className="w-6 h-6 text-offwhite" strokeWidth={1.75} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-dark leading-tight tracking-tight">
              iGaming Philippines&nbsp;—
              <br />
              Internal Wiki
            </h1>

            <p className="mt-2 text-sm text-dark/50 font-medium">
              Sign in to access the internal wiki
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5" noValidate>

            {/* ── Error banner ──────────────────────────────────── */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 bg-red/10 border border-red/25 text-red rounded-lg px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2} />
                <p className="text-sm font-medium leading-snug">{error}</p>
              </div>
            )}

            {/* ── Email ─────────────────────────────────────────── */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-dark"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="
                  w-full rounded-lg border border-dark/20 bg-white
                  px-4 py-2.5 text-sm text-dark
                  placeholder:text-dark/30
                  focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-[border-color,box-shadow] duration-150
                "
                disabled={loading}
              />
            </div>

            {/* ── Password ──────────────────────────────────────── */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-dark"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="
                    w-full rounded-lg border border-dark/20 bg-white
                    px-4 py-2.5 pr-11 text-sm text-dark
                    placeholder:text-dark/30
                    focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-[border-color,box-shadow] duration-150
                  "
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-dark/40 hover:text-dark/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* ── Submit ────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full mt-2 flex items-center justify-center gap-2
                bg-yellow text-dark font-bold text-sm
                py-3 rounded-lg
                hover:brightness-95 active:brightness-90
                focus:outline-none focus:ring-2 focus:ring-yellow/60 focus:ring-offset-2 focus:ring-offset-offwhite
                disabled:opacity-60 disabled:cursor-not-allowed
                transition duration-150 select-none
              "
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* ── Footer note ─────────────────────────────────────── */}
        <p className="mt-6 text-center text-xs text-offwhite/30">
          Access is restricted to authorised personnel only.
        </p>

      </div>
    </div>
  );
}
