-- =============================================================================
-- iGaming Philippines — Internal Wiki
-- Supabase schema
-- Run this once in the Supabase SQL Editor before running seed.sql
-- =============================================================================

-- ── Sections ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sections (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT        UNIQUE NOT NULL,
  title         TEXT        NOT NULL,
  icon          TEXT        NOT NULL DEFAULT 'FileText',
  colour        TEXT        NOT NULL DEFAULT '#0B704E',
  display_order INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Documents ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  section_slug TEXT        NOT NULL REFERENCES sections(slug) ON DELETE CASCADE,
  page_slug    TEXT        NOT NULL,
  title        TEXT        NOT NULL,
  content      JSONB       NOT NULL DEFAULT '{"type":"doc","content":[]}',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by   TEXT        NOT NULL DEFAULT '',
  UNIQUE (section_slug, page_slug)
);

CREATE INDEX IF NOT EXISTS idx_documents_section_slug ON documents(section_slug);

-- ── Users (mirrors auth.users with app-level role) ───────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role  TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer'))
);

-- ── Trigger: auto-insert into public.users on auth sign-up ───────────────────
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE sections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE users     ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read sections and documents
CREATE POLICY "Authenticated users can read sections"
  ON sections FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read documents"
  ON documents FOR SELECT TO authenticated USING (true);

-- Only admin role can write documents
CREATE POLICY "Admins can write documents"
  ON documents FOR ALL TO authenticated
  USING  ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Users can read their own profile; admins can read all
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT TO authenticated
  USING (id = auth.uid() OR
         (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Only admins can update roles
CREATE POLICY "Admins can update user roles"
  ON users FOR UPDATE TO authenticated
  USING  ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');
