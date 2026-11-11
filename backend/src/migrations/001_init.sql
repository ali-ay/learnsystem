-- Accounts, sessions, curriculum content and learning events.

CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL,
  display_name  TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'learner' CHECK (role IN ('learner', 'admin')),
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disabled')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at   TIMESTAMPTZ,
  approved_by   BIGINT REFERENCES users(id)
);
CREATE UNIQUE INDEX users_email_lower_idx ON users (lower(email));

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX sessions_user_idx ON sessions (user_id);

CREATE TABLE tracks (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('active', 'planned')),
  sort_order  INT NOT NULL DEFAULT 0
);

CREATE TABLE stages (
  id         TEXT PRIMARY KEY,
  track_id   TEXT NOT NULL REFERENCES tracks(id),
  name       TEXT NOT NULL,
  short_name TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '',
  folder     TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);
CREATE INDEX stages_track_idx ON stages (track_id, sort_order);

CREATE TABLE modules (
  id               TEXT PRIMARY KEY,
  stage_id         TEXT NOT NULL REFERENCES stages(id) ON DELETE CASCADE,
  number           TEXT NOT NULL,
  title            TEXT NOT NULL,
  duration         TEXT NOT NULL DEFAULT '20 dk',
  description      TEXT NOT NULL DEFAULT '',
  deep_dive        TEXT NOT NULL DEFAULT '',
  analogy_title    TEXT NOT NULL DEFAULT '',
  analogy_text     TEXT NOT NULL DEFAULT '',
  antigravity_code TEXT NOT NULL DEFAULT '',
  best_practices   JSONB NOT NULL DEFAULT '[]',
  sort_order       INT NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX modules_stage_idx ON modules (stage_id, sort_order);

CREATE TABLE questions (
  id              TEXT PRIMARY KEY,
  module_id       TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  category        TEXT NOT NULL DEFAULT '',
  type            TEXT NOT NULL DEFAULT 'conceptual',
  question        TEXT NOT NULL,
  code            TEXT NOT NULL DEFAULT '',
  options         JSONB NOT NULL DEFAULT '[]',
  correct_index   INT NOT NULL DEFAULT 0,
  explanation     TEXT NOT NULL DEFAULT '',
  engine_behavior TEXT NOT NULL DEFAULT '',
  best_practice   TEXT NOT NULL DEFAULT '',
  sort_order      INT NOT NULL DEFAULT 0
);
CREATE INDEX questions_module_idx ON questions (module_id, sort_order);

-- Append-only learning history. Statistics and progress are derived from it.
CREATE TABLE learning_events (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id    TEXT NOT NULL REFERENCES tracks(id),
  kind        TEXT NOT NULL,
  item_id     TEXT NOT NULL DEFAULT '',
  data        JSONB NOT NULL DEFAULT '{}',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX learning_events_user_track_idx ON learning_events (user_id, track_id, kind);

-- One-time import of progress that lived in the browser before accounts existed.
CREATE TABLE progress_imports (
  user_id     BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
