import { Session } from "@/types/user"
import { CustomError } from "@/types/error"

export type SignInDto = {
	email: string
	password: string
}

export type SignUpDto = {
	email: string
	password: string
}

export type MagicLinkDto = {
	email: string
}

export type ResetPasswordRequestDto = {
	email: string
	redirectTo: string
}

export type UpdatePasswordDto = {
	password: string
}

export interface AuthOutput {
	signIn(
		signInDto: SignInDto
	): Promise<{ session: Session | null; error: CustomError | null }>

	signUp(signUpDto: SignUpDto): Promise<{ error: CustomError | null }>

	signOut(): Promise<{ error: CustomError | null }>

	sendMagicLink(dto: MagicLinkDto): Promise<{ error: CustomError | null }>

	resetPasswordRequest(dto: ResetPasswordRequestDto): Promise<{ error: CustomError | null }>

	updatePassword(dto: UpdatePasswordDto): Promise<{ error: CustomError | null }>
}
