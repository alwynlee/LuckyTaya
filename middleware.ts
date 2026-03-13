import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/types";

/**
 * Routes that require an authenticated session.
 * All paths that start with /wiki are protected.
 */
const PROTECTED_PREFIX = "/wiki";

/**
 * Routes that authenticated users should be bounced away from
 * (e.g. no point visiting /login when already signed in).
 */
const AUTH_ONLY_ROUTES = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create a mutable response so the helper can refresh the session cookie.
  const response = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  // Refresh the session — this also writes any rotated tokens back to the
  // cookie so the client stays signed in between requests.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ── Protect /wiki/* ──────────────────────────────────────────────────────
  if (pathname.startsWith(PROTECTED_PREFIX)) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      // Preserve the intended destination so we can redirect back after login.
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Bounce authenticated users away from /login ──────────────────────────
  if (AUTH_ONLY_ROUTES.includes(pathname) && session) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo") ?? "/wiki";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return response;
}

export const config = {
  /*
   * Match every route EXCEPT:
   *   - Next.js internals (_next/static, _next/image)
   *   - Public assets (favicon, images, etc.)
   *   - API routes
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
