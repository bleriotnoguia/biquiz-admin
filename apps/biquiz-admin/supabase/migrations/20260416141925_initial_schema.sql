-- Initial schema baseline
-- Captured from biquiz-test project (ref: ijjhowzxolzsfeucfqui)

-- question_types must be created before questions (FK dependency)
CREATE TABLE IF NOT EXISTS public.question_types (
  id bigint NOT NULL,
  code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  is_active boolean DEFAULT true,
  CONSTRAINT question_types_pkey PRIMARY KEY (id)
);

-- question_categories must be created before questions (FK dependency)
CREATE TABLE IF NOT EXISTS public.question_categories (
  id bigint NOT NULL,
  level integer NOT NULL,
  parent_id bigint,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT question_categories_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.questions (
  id bigint NOT NULL,
  question_type_id bigint NOT NULL,
  question_category_id bigint,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT questions_pkey PRIMARY KEY (id)
);

-- question_options depends on questions
CREATE TABLE IF NOT EXISTS public.question_options (
  id bigint NOT NULL,
  question_id bigint,
  is_correct boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT question_options_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.question_translations (
  id bigint NOT NULL,
  locale varchar(191) NOT NULL,
  name text NOT NULL,
  source_text text NOT NULL,
  question_id bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT question_translations_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.question_category_translations (
  id bigint NOT NULL,
  locale varchar(191) NOT NULL,
  name text NOT NULL,
  question_category_id bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT question_category_translations_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.question_option_translations (
  id bigint NOT NULL,
  locale varchar(191) NOT NULL,
  name text,
  question_option_id bigint,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT question_option_translations_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.question_type_translations (
  id bigint NOT NULL,
  question_type_id bigint NOT NULL,
  locale varchar NOT NULL,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT question_types_translations_pkey PRIMARY KEY (id)
);

-- Foreign key constraints
DO $$ BEGIN
  ALTER TABLE public.questions
    ADD CONSTRAINT questions_question_type_id_fkey
    FOREIGN KEY (question_type_id) REFERENCES public.question_types(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.questions
    ADD CONSTRAINT questions_question_category_id_fkey
    FOREIGN KEY (question_category_id) REFERENCES public.question_categories(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.question_options
    ADD CONSTRAINT question_options_question_id_fkey
    FOREIGN KEY (question_id) REFERENCES public.questions(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.question_translations
    ADD CONSTRAINT question_translations_question_id_fkey
    FOREIGN KEY (question_id) REFERENCES public.questions(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.question_category_translations
    ADD CONSTRAINT question_category_translations_question_category_id_fkey
    FOREIGN KEY (question_category_id) REFERENCES public.question_categories(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.question_option_translations
    ADD CONSTRAINT question_option_translations_question_option_id_fkey
    FOREIGN KEY (question_option_id) REFERENCES public.question_options(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.question_type_translations
    ADD CONSTRAINT question_types_translations_question_types_id_fkey
    FOREIGN KEY (question_type_id) REFERENCES public.question_types(id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- FK covering indexes (no duplicate _id_key unique constraints — pkey covers uniqueness)
CREATE INDEX IF NOT EXISTS idx_questions_question_type_id ON public.questions(question_type_id);
CREATE INDEX IF NOT EXISTS idx_questions_question_category_id ON public.questions(question_category_id);
CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON public.question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_question_translations_question_id ON public.question_translations(question_id);
CREATE INDEX IF NOT EXISTS idx_question_category_translations_question_category_id ON public.question_category_translations(question_category_id);
CREATE INDEX IF NOT EXISTS idx_question_option_translations_question_option_id ON public.question_option_translations(question_option_id);
CREATE INDEX IF NOT EXISTS idx_question_type_translations_question_type_id ON public.question_type_translations(question_type_id);
