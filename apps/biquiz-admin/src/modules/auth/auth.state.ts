import { CustomError } from "@/types/error"
import { Session } from "@/types/user"
import { RequestStatus } from "@/types/request-status"

export interface AuthState {
	session: Session | null
	signInError: CustomError | null
	signInStatus: RequestStatus
	signUpError: CustomError | null
	signUpStatus: RequestStatus
	signOutError: CustomError | null
	signOutStatus: RequestStatus
	magicLinkError: CustomError | null
	magicLinkStatus: RequestStatus
	resetPasswordRequestError: CustomError | null
	resetPasswordRequestStatus: RequestStatus
	updatePasswordError: CustomError | null
	updatePasswordStatus: RequestStatus
}

export const initialState: AuthState = {
	session: null,
	signInError: null,
	signInStatus: RequestStatus.IDLE,
	signUpError: null,
	signUpStatus: RequestStatus.IDLE,
	signOutError: null,
	signOutStatus: RequestStatus.IDLE,
	magicLinkError: null,
	magicLinkStatus: RequestStatus.IDLE,
	resetPasswordRequestError: null,
	resetPasswordRequestStatus: RequestStatus.IDLE,
	updatePasswordError: null,
	updatePasswordStatus: RequestStatus.IDLE,
}
