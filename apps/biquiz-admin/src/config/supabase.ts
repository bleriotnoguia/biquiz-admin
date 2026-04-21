import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

// Prevent build-time crashes (e.g. prerendering /_not-found) when env vars are
// not available yet in CI. Runtime calls will still fail if real env vars
// are missing, but static generation can complete.
export const supabase = hasSupabaseEnv
	? createClient(supabaseUrl as string, supabaseAnonKey as string)
	: createClient("http://127.0.0.1:54321", "missing-supabase-env", {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
		})
