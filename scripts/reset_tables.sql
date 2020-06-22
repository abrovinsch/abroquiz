-- Drop all tables
DROP TABLE IF EXISTS "questions";
DROP TABLE IF EXISTS "quizes";
DROP TABLE IF EXISTS "sections";
DROP TABLE IF EXISTS "courses";

-- Recreate all tables
CREATE TABLE IF NOT EXISTS "questions" (
    "question_id"	INTEGER,
    "quiz_id"	INTEGER NOT NULL,
    "question_text"	TEXT NOT NULL,
    "answer_text"	TEXT NOT NULL,
    "media_src"	TEXT,
    "false_option1"	TEXT,
    "false_option2"	TEXT,
    "false_option3"	TEXT,
    "question_type"	TEXT NOT NULL DEFAULT 'multi_options',
    PRIMARY KEY("question_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "quizes" (
    "quiz_id"	INTEGER,
    "section_id"	INTEGER NOT NULL,
    "name"	TEXT NOT NULL,
    "description"	TEXT NOT NULL,
    "media_src"	TEXT,
    PRIMARY KEY("quiz_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "sections" (
    "section_id"	INTEGER,
    "course_id"	INTEGER NOT NULL,
    "name"	TEXT NOT NULL,
    "description"	TEXT NOT NULL,
    "media_src"	TEXT,
    PRIMARY KEY("section_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "courses"
(
    "course_id"	INTEGER,
    "name"	TEXT NOT NULL,
    "description"	TEXT NOT NULL,
    "media_src"	TEXT,
    PRIMARY KEY ("course_id" AUTOINCREMENT)
);