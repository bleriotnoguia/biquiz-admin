-- Tighten overly permissive write policies from previous migration.
-- Keep public read access, remove broad authenticated write access.

DROP POLICY IF EXISTS "Authenticated write question_categories" ON public.question_categories;
DROP POLICY IF EXISTS "Authenticated write question_category_translations" ON public.question_category_translations;
DROP POLICY IF EXISTS "Authenticated write question_option_translations" ON public.question_option_translations;
DROP POLICY IF EXISTS "Authenticated write question_options" ON public.question_options;
DROP POLICY IF EXISTS "Authenticated write question_translations" ON public.question_translations;
DROP POLICY IF EXISTS "Authenticated write question_type_translations" ON public.question_type_translations;
DROP POLICY IF EXISTS "Authenticated write question_types" ON public.question_types;
DROP POLICY IF EXISTS "Authenticated write questions" ON public.questions;
