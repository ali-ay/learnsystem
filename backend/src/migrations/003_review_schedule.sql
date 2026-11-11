-- Spaced repetition: one row per learner and word. box = consecutive correct answers (0–5).
CREATE TABLE review_schedule (
  user_id       BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  word_id       TEXT NOT NULL REFERENCES vocab_words(id) ON DELETE CASCADE,
  box           INT NOT NULL DEFAULT 0,
  due_at        TIMESTAMPTZ NOT NULL,
  correct_count INT NOT NULL DEFAULT 0,
  wrong_count   INT NOT NULL DEFAULT 0,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, word_id)
);
CREATE INDEX review_schedule_due_idx ON review_schedule (user_id, due_at);
