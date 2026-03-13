-- =============================================================================
-- Full-Text Search for documents
-- Run in the Supabase SQL Editor AFTER schema.sql
--
-- What this does:
--   1. Adds a helper function that extracts plain text from TipTap / ProseMirror JSONB
--   2. Adds a stored tsvector generated column (title weighted A, body text weighted B)
--   3. Builds a GIN index for fast full-text lookups
-- =============================================================================

-- ── 1. Helper: extract plain text from ProseMirror JSONB ──────────────────────
--
-- TipTap stores content as nested JSONB. Text lives in nodes with type "text".
-- jsonb_path_query walks the entire tree and returns every matching node object;
-- we then pull out the "text" field from each.

CREATE OR REPLACE FUNCTION public.prosemirror_to_text(content JSONB)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
STRICT
AS $$
  SELECT COALESCE(
    string_agg(node ->> 'text', ' '),
    ''
  )
  FROM jsonb_path_query(content, '$.** ? (@.type == "text")') AS node
$$;

-- ── 2. Generated tsvector column (stored, auto-maintained by Postgres) ─────────
--
-- Weights:
--   A = title   (highest priority in ts_rank)
--   B = body text

ALTER TABLE documents
  ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(public.prosemirror_to_text(content), '')), 'B')
  ) STORED;

-- ── 3. GIN index for O(log n) full-text lookups ───────────────────────────────

CREATE INDEX IF NOT EXISTS idx_documents_search_vector
  ON documents USING GIN (search_vector);
