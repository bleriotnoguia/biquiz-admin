export type User = {
	id: string
	name?: string
	email?: string
	avatar_url?: string
	user_metadata?: {
		avatar_url?: string
		full_name?: string
		[key: string]: unknown
	}
}

export type Session = {
	access_token: string
	token_type: string
	expires_in: number
	refresh_token: string
	user: User
	expires_at?: number
}
