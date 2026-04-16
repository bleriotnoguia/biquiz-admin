-- RPC functions and Row Level Security
-- Captured from biquiz-test project (ref: ijjhowzxolzsfeucfqui)

-- ============================================================
-- RPC FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_categories()
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;
    category_record RECORD;
    translation_records JSONB;
BEGIN
    FOR category_record IN
        SELECT id, level, is_active, created_at
        FROM question_categories
    LOOP
        translation_records := (
            SELECT jsonb_agg(jsonb_build_object('locale', locale, 'name', name))
            FROM question_category_translations
            WHERE question_category_id = category_record.id
        );

        result := result || jsonb_build_object(
            'id', category_record.id,
            'level', category_record.level,
            'is_active', category_record.is_active,
            'created_at', category_record.created_at,
            'translate', translation_records
        );
    END LOOP;

    RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_question_types()
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;
    question_type_record RECORD;
    translation_records JSONB;
BEGIN
    FOR question_type_record IN
        SELECT id, is_active
        FROM question_types
    LOOP
        translation_records := (
            SELECT jsonb_agg(jsonb_build_object('locale', locale, 'name', name))
            FROM question_type_translations
            WHERE question_type_id = question_type_record.id
        );

        result := result || jsonb_build_object(
            'id', question_type_record.id,
            'is_active', question_type_record.is_active,
            'translate', translation_records
        );
    END LOOP;

    RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_questions(p_locale character varying)
RETURNS TABLE(
    type character varying,
    source_text text,
    name character varying,
    locale character varying,
    category character varying,
    id integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        qty.name::VARCHAR AS type,
        qt.source_text,
        qt.name::VARCHAR,
        qt.locale,
        qc.name::VARCHAR AS category,
        q.id::INT,
        q.is_active,
        q.created_at::TIMESTAMP,
        q.updated_at::TIMESTAMP
    FROM
        question_translations AS qt
        JOIN questions q ON qt.question_id = q.id
        JOIN question_types qty ON q.question_type_id = qty.id
        JOIN question_category_translations qc ON q.question_category_id = qc.question_category_id
    WHERE
        qt.locale = p_locale
        AND qc.locale = p_locale;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_question_details()
RETURNS TABLE(
    id bigint,
    name_en text,
    name_fr text,
    source_text_en text,
    source_text_fr text,
    is_active boolean,
    category_id bigint,
    type_id bigint,
    options json,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        q.id,
        qt.name AS name_en,
        qtfr.name AS name_fr,
        qt.source_text AS source_text_en,
        qtfr.source_text AS source_text_fr,
        q.is_active,
        q.question_category_id AS category_id,
        q.question_type_id AS type_id,
        json_agg(
            json_build_object(
                'id', qo.id,
                'is_correct', qo.is_correct,
                'name_en', qot.name,
                'name_fr', qotfr.name
            )
        ) AS options,
        q.created_at,
        q.updated_at
    FROM
        questions q
        LEFT JOIN question_translations qt ON q.id = qt.question_id AND qt.locale = 'en'
        LEFT JOIN question_translations qtfr ON q.id = qtfr.question_id AND qtfr.locale = 'fr'
        LEFT JOIN question_options qo ON q.id = qo.question_id
        LEFT JOIN question_option_translations qot ON qo.id = qot.question_option_id AND qot.locale = 'en'
        LEFT JOIN question_option_translations qotfr ON qo.id = qotfr.question_option_id AND qotfr.locale = 'fr'
    GROUP BY
        q.id,
        qt.name,
        qtfr.name,
        qt.source_text,
        qtfr.source_text,
        q.is_active,
        q.question_category_id,
        q.question_type_id,
        q.created_at,
        q.updated_at;
END;
$function$;

CREATE OR REPLACE FUNCTION public.insert_question_dataa(p_data jsonb)
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    v_question_id INT;
    v_name_en VARCHAR;
    v_name_fr VARCHAR;
    v_source_text_en TEXT;
    v_source_text_fr TEXT;
    v_is_active BOOLEAN;
    v_category_id INT;
    v_type_id INT;
    v_option_data JSONB;
BEGIN
    SELECT
        p_data->>'name_en',
        p_data->>'name_fr',
        p_data->>'source_text_en',
        p_data->>'source_text_fr',
        (p_data->>'is_active')::BOOLEAN,
        (p_data->>'category_id')::INT,
        (p_data->>'type_id')::INT
    INTO
        v_name_en,
        v_name_fr,
        v_source_text_en,
        v_source_text_fr,
        v_is_active,
        v_category_id,
        v_type_id;

    INSERT INTO questions (is_active, question_category_id, question_type_id)
    VALUES (v_is_active, v_category_id, v_type_id)
    RETURNING id INTO v_question_id;

    INSERT INTO question_translations (question_id, locale, name, source_text)
    VALUES (v_question_id, 'en', v_name_en, v_source_text_en);

    INSERT INTO question_translations (question_id, locale, name, source_text)
    VALUES (v_question_id, 'fr', v_name_fr, v_source_text_fr);

    FOR v_option_data IN SELECT jsonb_array_elements(p_data->'options')::jsonb LOOP
        DECLARE
            v_option_id INT;
        BEGIN
            INSERT INTO question_options (question_id, is_correct)
            VALUES (v_question_id, (v_option_data->>'is_correct')::BOOLEAN)
            RETURNING id INTO v_option_id;

            INSERT INTO question_option_translations (question_option_id, locale, name)
            VALUES (v_option_id, 'en', v_option_data->>'name_en');

            INSERT INTO question_option_translations (question_option_id, locale, name)
            VALUES (v_option_id, 'fr', v_option_data->>'name_fr');
        END;
    END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_question_dataa(p_data jsonb)
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    v_id INT;
    v_name_en VARCHAR;
    v_name_fr VARCHAR;
    v_source_text_en TEXT;
    v_source_text_fr TEXT;
    v_is_active BOOLEAN;
    v_category_id INT;
    v_type_id INT;
    v_option JSONB;
BEGIN
    SELECT
        p_data->>'id',
        p_data->>'name_en',
        p_data->>'name_fr',
        p_data->>'source_text_en',
        p_data->>'source_text_fr',
        (p_data->>'is_active')::BOOLEAN,
        (p_data->>'category_id')::INT,
        (p_data->>'type_id')::INT
    INTO
        v_id,
        v_name_en,
        v_name_fr,
        v_source_text_en,
        v_source_text_fr,
        v_is_active,
        v_category_id,
        v_type_id;

    UPDATE questions
    SET
        is_active = v_is_active,
        question_category_id = v_category_id,
        question_type_id = v_type_id
    WHERE id = v_id;

    UPDATE question_translations
    SET name = v_name_en, source_text = v_source_text_en
    WHERE question_id = v_id AND locale = 'en';

    UPDATE question_translations
    SET name = v_name_fr, source_text = v_source_text_fr
    WHERE question_id = v_id AND locale = 'fr';

    FOR v_option IN SELECT jsonb_array_elements(p_data->'options')::jsonb LOOP
        UPDATE question_options
        SET is_correct = (v_option->>'is_correct')::BOOLEAN
        WHERE id = (v_option->>'id')::INT;

        UPDATE question_option_translations
        SET name = v_option->>'name_en'
        WHERE question_option_id = (v_option->>'id')::INT AND locale = 'en';

        UPDATE question_option_translations
        SET name = v_option->>'name_fr'
        WHERE question_option_id = (v_option->>'id')::INT AND locale = 'fr';
    END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_question_datata(p_data jsonb)
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    v_id INT;
    v_name_en VARCHAR;
    v_name_fr VARCHAR;
    v_source_text_en TEXT;
    v_source_text_fr TEXT;
    v_is_active BOOLEAN;
    v_category_id INT;
    v_type_id INT;
    v_option RECORD;
BEGIN
    SELECT
        p_data->>'id',
        p_data->>'name_en',
        p_data->>'name_fr',
        p_data->>'source_text_en',
        p_data->>'source_text_fr',
        (p_data->>'is_active')::BOOLEAN,
        (p_data->>'category_id')::INT,
        (p_data->>'type_id')::INT
    INTO
        v_id,
        v_name_en,
        v_name_fr,
        v_source_text_en,
        v_source_text_fr,
        v_is_active,
        v_category_id,
        v_type_id;

    UPDATE questions
    SET
        is_active = v_is_active,
        question_category_id = v_category_id,
        question_type_id = v_type_id
    WHERE id = v_id;

    UPDATE question_translations
    SET name = v_name_en, source_text = v_source_text_en
    WHERE question_id = v_id AND locale = 'en';

    UPDATE question_translations
    SET name = v_name_fr, source_text = v_source_text_fr
    WHERE question_id = v_id AND locale = 'fr';

    DECLARE
        option_cursor CURSOR FOR
            SELECT * FROM jsonb_array_elements(p_data->'options');
    BEGIN
        FOR v_option IN option_cursor LOOP
            UPDATE question_options
            SET is_correct = (v_option->>'is_correct')::BOOLEAN
            WHERE id = (v_option->>'id')::INT;

            UPDATE question_option_translations
            SET name = v_option->>'name_en'
            WHERE question_option_id = (v_option->>'id')::INT AND locale = 'en';

            UPDATE question_option_translations
            SET name = v_option->>'name_fr'
            WHERE question_option_id = (v_option->>'id')::INT AND locale = 'fr';
        END LOOP;
    END;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_question_data(question_id integer)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM question_option_translations qot
    WHERE qot.question_option_id IN (
        SELECT qo.id FROM question_options qo WHERE qo.question_id = question_id
    );

    DELETE FROM question_options qo WHERE qo.question_id = question_id;

    DELETE FROM question_translations qt WHERE qt.question_id = question_id;

    DELETE FROM questions WHERE id = question_id;
END;
$function$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.question_type_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Enable read access for all users"
    ON public.question_type_translations
    FOR SELECT
    TO public
    USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;
