export type User = {
	id: string
	name?: string
	email?: string
}

export type Session = {
	access_token: string
	token_type: string
	expires_in: number
	refresh_token: string
	user: User
	expires_at?: number
}
