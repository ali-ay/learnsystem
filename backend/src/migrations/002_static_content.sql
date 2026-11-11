-- Static curriculum content moves from source files into the database.

ALTER TABLE stages ADD COLUMN IF NOT EXISTS vocab_target INT NOT NULL DEFAULT 0;

CREATE TABLE vocab_words (
  id         TEXT PRIMARY KEY,
  stage_id   TEXT NOT NULL REFERENCES stages(id) ON DELETE CASCADE,
  en         TEXT NOT NULL,
  tr         TEXT NOT NULL,
  example    TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);
CREATE INDEX vocab_words_stage_idx ON vocab_words (stage_id, sort_order);

CREATE TABLE placement_levels (
  level     TEXT PRIMARY KEY CHECK (level IN ('A1','A2','B1','B2')),
  label     TEXT NOT NULL,
  stage_id  TEXT NOT NULL REFERENCES stages(id),
  summary   TEXT NOT NULL DEFAULT '',
  min_score INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE placement_questions (
  id            TEXT PRIMARY KEY,
  level         TEXT NOT NULL REFERENCES placement_levels(level),
  question      TEXT NOT NULL,
  options       JSONB NOT NULL,
  correct_index INT NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0
);

CREATE TABLE quiz_bank_questions (
  id              TEXT PRIMARY KEY,
  track_id        TEXT NOT NULL REFERENCES tracks(id),
  level           TEXT NOT NULL,
  category        TEXT NOT NULL DEFAULT '',
  type            TEXT NOT NULL DEFAULT 'conceptual',
  question        TEXT NOT NULL,
  code            TEXT NOT NULL DEFAULT '',
  options         JSONB NOT NULL,
  correct_index   INT NOT NULL,
  explanation     TEXT NOT NULL DEFAULT '',
  engine_behavior TEXT NOT NULL DEFAULT '',
  best_practice   TEXT NOT NULL DEFAULT '',
  sort_order      INT NOT NULL DEFAULT 0
);
CREATE INDEX quiz_bank_level_idx ON quiz_bank_questions (track_id, level, sort_order);
