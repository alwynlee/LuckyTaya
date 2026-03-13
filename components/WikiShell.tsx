"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import DynamicIcon from "@/components/DynamicIcon";
import SearchBar from "@/components/SearchBar";
import SubNav from "@/components/SubNav";
import { cn } from "@/lib/utils";
import type { Section } from "@/types";

interface WikiShellProps {
  sections: Section[];
  children: React.ReactNode;
}

export default function WikiShell({ sections, children }: WikiShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { user, session, signOut } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);

  // /wiki/[section]/[page] → parts[1] is section slug
  const pathParts = pathname.split("/").filter(Boolean);
  const currentSectionSlug = pathParts[1] ?? null;
  const currentSection = sections.find((s) => s.slug === currentSectionSlug) ?? null;

  const displayEmail = user?.email ?? session?.user.email ?? "";

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [drawerOpen]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // ── Shared nav link list ──────────────────────────────────────────────────
  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {sections.map((section) => {
        const isActive = currentSectionSlug === section.slug;
        return (
          <Link
            key={section.slug}
            href={`/wiki/${section.slug}`}
            onClick={onLinkClick}
            className={cn(
              "group flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg",
              "border-l-2 text-sm font-medium",
              "transition-all duration-150",
              isActive
                ? "bg-white/10 text-offwhite"
                : "border-transparent text-offwhite/55 hover:text-offwhite hover:bg-white/6"
            )}
            style={isActive ? { borderLeftColor: section.colour } : undefined}
          >
            <DynamicIcon
              name={section.icon}
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isActive ? "text-offwhite" : "text-offwhite/50 group-hover:text-offwhite/80"
              )}
            />
            <span className="truncate">{section.title}</span>
          </Link>
        );
      })}
    </>
  );

  // ── Sidebar brand header ──────────────────────────────────────────────────
  const BrandHeader = () => (
    <div className="px-6 py-5 border-b border-white/10 shrink-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-offwhite/35 mb-0.5">
        iGaming Philippines
      </p>
      <h1 className="text-[15px] font-bold text-offwhite leading-snug">
        Internal Wiki
      </h1>
    </div>
  );

  // ── Sidebar footer ────────────────────────────────────────────────────────
  const SidebarFooter = () => (
    <div className="px-5 py-4 border-t border-white/10 shrink-0">
      <p className="text-[11px] text-offwhite/35 font-medium truncate px-1">
        {displayEmail}
      </p>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-offwhite">
      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 bg-dark overflow-y-auto">
        <BrandHeader />
        <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
          <NavLinks />
        </nav>
        <SidebarFooter />
      </aside>

      {/* ── Mobile overlay backdrop ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/60 z-40 lg:hidden",
          "transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-dark lg:hidden",
          "transform transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between pl-6 pr-4 py-5 border-b border-white/10 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-offwhite/35 mb-0.5">
              iGaming Philippines
            </p>
            <h1 className="text-[15px] font-bold text-offwhite">Internal Wiki</h1>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="p-1.5 rounded-md text-offwhite/50 hover:text-offwhite hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
          <NavLinks onLinkClick={() => setDrawerOpen(false)} />
        </nav>

        <SidebarFooter />
      </div>

      {/* ── Main content column ──────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar — `relative` is required so SearchBar's absolute overlays work */}
        <header className="relative flex items-center gap-3 bg-offwhite border-b border-dark/10 px-4 lg:px-6 h-14 shrink-0">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className="lg:hidden p-1.5 rounded-md text-dark/50 hover:text-dark hover:bg-dark/6 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Section title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {currentSection ? (
              <>
                <span
                  className="hidden sm:block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: currentSection.colour }}
                />
                <span className="text-sm font-semibold text-dark truncate">
                  {currentSection.title}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-dark/40">Wiki</span>
            )}
          </div>

          {/* Search */}
          <SearchBar sections={sections} />

          {/* User email + sign out */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:block text-xs text-dark/45 font-medium max-w-[180px] truncate">
              {displayEmail}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs font-semibold text-dark/50 hover:text-red px-2.5 py-1.5 rounded-md hover:bg-red/8 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        {/* Section sub-navigation tabs */}
        {currentSection && (
          <SubNav
            sectionSlug={currentSection.slug}
            sectionColour={currentSection.colour}
          />
        )}

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
