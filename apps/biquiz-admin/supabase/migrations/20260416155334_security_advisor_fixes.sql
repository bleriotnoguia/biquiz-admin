-- Security Advisor fixes:
-- - Enable RLS on public tables
-- - Add explicit table policies
-- - Lock function search_path
-- - Remove public listing on avatars bucket

-- 1) Enable RLS on all public app tables
ALTER TABLE public.question_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_option_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_type_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- 2) Replace public-table policies with explicit read/write behavior
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_categories" ON public.question_categories;
  DROP POLICY IF EXISTS "Authenticated write question_categories" ON public.question_categories;
  CREATE POLICY "Public read question_categories" ON public.question_categories FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_categories" ON public.question_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_category_translations" ON public.question_category_translations;
  DROP POLICY IF EXISTS "Authenticated write question_category_translations" ON public.question_category_translations;
  CREATE POLICY "Public read question_category_translations" ON public.question_category_translations FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_category_translations" ON public.question_category_translations FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_option_translations" ON public.question_option_translations;
  DROP POLICY IF EXISTS "Authenticated write question_option_translations" ON public.question_option_translations;
  CREATE POLICY "Public read question_option_translations" ON public.question_option_translations FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_option_translations" ON public.question_option_translations FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_options" ON public.question_options;
  DROP POLICY IF EXISTS "Authenticated write question_options" ON public.question_options;
  CREATE POLICY "Public read question_options" ON public.question_options FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_options" ON public.question_options FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_translations" ON public.question_translations;
  DROP POLICY IF EXISTS "Authenticated write question_translations" ON public.question_translations;
  CREATE POLICY "Public read question_translations" ON public.question_translations FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_translations" ON public.question_translations FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.question_type_translations;
  DROP POLICY IF EXISTS "Public read question_type_translations" ON public.question_type_translations;
  DROP POLICY IF EXISTS "Authenticated write question_type_translations" ON public.question_type_translations;
  CREATE POLICY "Public read question_type_translations" ON public.question_type_translations FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_type_translations" ON public.question_type_translations FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read question_types" ON public.question_types;
  DROP POLICY IF EXISTS "Authenticated write question_types" ON public.question_types;
  CREATE POLICY "Public read question_types" ON public.question_types FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write question_types" ON public.question_types FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read questions" ON public.questions;
  DROP POLICY IF EXISTS "Authenticated write questions" ON public.questions;
  CREATE POLICY "Public read questions" ON public.questions FOR SELECT TO public USING (true);
  CREATE POLICY "Authenticated write questions" ON public.questions FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

-- 3) Lock function search_path (fixes mutable search path warnings)
ALTER FUNCTION public.delete_question_data(question_id integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_categories() SET search_path = public, pg_temp;
ALTER FUNCTION public.get_question_details() SET search_path = public, pg_temp;
ALTER FUNCTION public.get_question_types() SET search_path = public, pg_temp;
ALTER FUNCTION public.get_questions(p_locale character varying) SET search_path = public, pg_temp;
ALTER FUNCTION public.insert_question_dataa(p_data jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.update_question_dataa(p_data jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.update_question_datata(p_data jsonb) SET search_path = public, pg_temp;

-- 4) Remove broad public listing policy from storage avatars bucket
DROP POLICY IF EXISTS "Avatars are publicly readable" ON storage.objects;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated read own avatar" ON storage.objects;
  CREATE POLICY "Authenticated read own avatar"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'avatars'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
END $$;

UPDATE storage.buckets
SET public = false
WHERE id = 'avatars';
