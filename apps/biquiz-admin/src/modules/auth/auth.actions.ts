import {
  AuthOutput,
  MagicLinkDto,
  ResetPasswordRequestDto,
  SignInDto,
  SignUpDto,
  UpdatePasswordDto,
} from '@/modules/auth/auth.output'
import { Session } from '@biquiz/shared'
import { CustomError } from '@biquiz/shared'
import { authSlice } from '@/modules/auth/auth.slice'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'
import { AuthState } from '@/modules/auth/auth.state'
import { TypedDispatch } from '@/config/store'
import { RootState } from '@/config/store'

const { actions } = authSlice

type ThunkExtra = { authOutput: AuthOutput }
type ThunkApi = (dispatch: TypedDispatch, getState: () => RootState, extra: ThunkExtra) => Promise<void>

export const signIn =
  (signInDto: SignInDto): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_IN }))

    const signInRo: { session: Session | null; error: CustomError | null } =
      await authOutput.signIn(signInDto)

    dispatch(actions.signIn(signInRo))
  }

export const signUp =
  (signUpDto: SignUpDto): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_UP }))

    const signUpRo: { error: CustomError | null } = await authOutput.signUp(signUpDto)

    dispatch(actions.signUp(signUpRo))
  }

export const signOut =
  (): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.SIGN_OUT }))

    const signOutRo: { error: CustomError | null } = await authOutput.signOut()

    dispatch(actions.signOut(signOutRo))
  }

export const sendMagicLink =
  (dto: MagicLinkDto): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.MAGIC_LINK }))

    const ro: { error: CustomError | null } = await authOutput.sendMagicLink(dto)

    dispatch(actions.magicLink(ro))
  }

export const resetPasswordRequest =
  (dto: ResetPasswordRequestDto): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.RESET_PASSWORD_REQUEST }))

    const ro: { error: CustomError | null } = await authOutput.resetPasswordRequest(dto)

    dispatch(actions.resetPasswordRequest(ro))
  }

export const updatePassword =
  (dto: UpdatePasswordDto): ThunkApi =>
  async (dispatch, _, { authOutput }) => {
    dispatch(actions.startCall({ callType: AuthCallTypes.UPDATE_PASSWORD }))

    const ro: { error: CustomError | null } = await authOutput.updatePassword(dto)

    dispatch(actions.updatePassword(ro))
  }

export const resetAuthStatus =
  (fields: (keyof AuthState)[]) =>
  async (dispatch: TypedDispatch) => {
    dispatch(actions.resetAuthStatus({ fields }))
  }

export const setSessionFromLocalSessionData =
  (localSessionData: Session) =>
  async (dispatch: TypedDispatch) => {
    dispatch(actions.setLoggedInUserWithLocalData({ localSessionData }))
  }
