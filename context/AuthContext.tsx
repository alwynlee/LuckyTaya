"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";
import type { Database, User, UserRole } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthState {
  /** Supabase session, null when signed out, undefined while loading */
  session: Session | null | undefined;
  /** Resolved app user (from the public users table), null if not yet loaded */
  user: User | null;
  /** Convenience shorthand for user?.role */
  role: UserRole | null;
  /** True while the initial session check is in flight */
  loading: boolean;
  /** Sign the user out and redirect to /login */
  signOut: () => Promise<void>;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthState | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Fetch the app-level user profile from the public users table ──────────
  const fetchUserProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("id", userId)
        .single();

      if (error || !data) {
        // Profile row may not exist yet — default to viewer
        return null;
      }

      return data as User;
    },
    [supabase]
  );

  // ── Bootstrap: read the current session once on mount ────────────────────
  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(initialSession);

      if (initialSession?.user) {
        const profile = await fetchUserProfile(initialSession.user.id);
        if (mounted) setUser(profile);
      }

      setLoading(false);
    };

    bootstrap();
    return () => {
      mounted = false;
    };
  }, [supabase, fetchUserProfile]);

  // ── Subscribe to auth state changes (sign in / sign out / token refresh) ──
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        const profile = await fetchUserProfile(newSession.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchUserProfile]);

  // ── Sign out ──────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }, [supabase, router]);

  // ── Stable context value ──────────────────────────────────────────────────
  const value = useMemo<AuthState>(
    () => ({
      session,
      user,
      role: user?.role ?? null,
      loading,
      signOut,
    }),
    [session, user, loading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access authentication state anywhere in the component tree.
 *
 * @example
 * const { user, role, signOut } = useAuth();
 */
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}
