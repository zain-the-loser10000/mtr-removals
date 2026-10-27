-- MTR Removals database schema (PostgreSQL)
-- Works with Neon (Vercel Marketplace), Supabase or any Postgres.
-- The backend creates this table automatically on the first enquiry,
-- so running this file by hand is optional.

CREATE TABLE IF NOT EXISTS enquiries (
  id             SERIAL PRIMARY KEY,
  name           TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  email          TEXT,
  move_type      TEXT        NOT NULL,          -- home | office | furniture | interstate
  property_size  TEXT,
  move_from      TEXT        NOT NULL,
  move_to        TEXT        NOT NULL,
  move_date      DATE,
  flexible_date  BOOLEAN     NOT NULL DEFAULT FALSE,
  packing_help   BOOLEAN     NOT NULL DEFAULT FALSE,
  callback_time  TEXT,
  message        TEXT,
  source_page    TEXT,
  ip_address     TEXT,
  user_agent     TEXT,
  status         TEXT        NOT NULL DEFAULT 'new',   -- new | contacted | booked | closed
  email_sent     BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status  ON enquiries (status);
