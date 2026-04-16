import {
  AuthOutput,
  MagicLinkDto,
  ResetPasswordRequestDto,
  SignInDto,
  SignUpDto,
  UpdatePasswordDto,
} from '@/modules/auth/auth.output'
import { Session } from '@/types/user'
import { CustomError } from '@/types/error'
import { authSlice } from '@/modules/auth/auth.slice'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'
import { AuthState } from '@/modules/auth/auth.state'

const { actions } = authSlice

export const signIn =
  (signInDto: SignInDto) =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_IN }))

    const signInRo: { session: Session | null; error: CustomError | null } =
      await authOutput.signIn(signInDto)

    dispatch(actions.signIn(signInRo))
  }

export const signUp =
  (signUpDto: SignUpDto) =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_UP }))

    const signUpRo: { error: CustomError | null } = await authOutput.signUp(signUpDto)

    dispatch(actions.signUp(signUpRo))
  }

export const signOut =
  () =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_OUT }))

    const signOutRo: { error: CustomError | null } = await authOutput.signOut()

    dispatch(actions.signOut(signOutRo))
  }

export const sendMagicLink =
  (dto: MagicLinkDto) =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.MAGIC_LINK }))

    const ro: { error: CustomError | null } = await authOutput.sendMagicLink(dto)

    dispatch(actions.magicLink(ro))
  }

export const resetPasswordRequest =
  (dto: ResetPasswordRequestDto) =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.RESET_PASSWORD_REQUEST }))

    const ro: { error: CustomError | null } = await authOutput.resetPasswordRequest(dto)

    dispatch(actions.resetPasswordRequest(ro))
  }

export const updatePassword =
  (dto: UpdatePasswordDto) =>
  async (dispatch: any, _: any, { authOutput }: { authOutput: AuthOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.UPDATE_PASSWORD }))

    const ro: { error: CustomError | null } = await authOutput.updatePassword(dto)

    dispatch(actions.updatePassword(ro))
  }

export const resetAuthStatus =
  (fields: (keyof AuthState)[]) => async (dispatch: any) => {
    dispatch(actions.resetAuthStatus({ fields }))
  }

export const setSessionFromLocalSessionData =
  (localSessionData: Session) => async (dispatch: any) => {
    dispatch(actions.setLoggedInUserWithLocalData({ localSessionData }))
  }
