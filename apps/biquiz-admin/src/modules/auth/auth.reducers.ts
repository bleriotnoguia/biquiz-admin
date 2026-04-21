import { AuthState } from '@/modules/auth/auth.state'
import { PayloadAction } from '@reduxjs/toolkit'
import { Session } from '@biquiz/shared'
import { CustomError } from '@biquiz/shared'
import { RequestStatus } from '@biquiz/shared'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'

export const authReducers = {
  startCall: (state: AuthState, { payload }: PayloadAction<{ callType: AuthCallTypes }>) => {
    state[payload.callType] = RequestStatus.LOADING
  },
  signIn: (
    state: AuthState,
    { payload }: PayloadAction<{ session: Session | null; error: CustomError | null }>
  ) => {
    state.session = payload.session
    state.signInError = payload.error

    state.signInStatus = payload.error ? RequestStatus.FAILED : RequestStatus.COMPLETED
  },
  signUp: (state: AuthState, { payload }: PayloadAction<{ error: CustomError | null }>) => {
    state.signUpError = payload.error

    state.signUpStatus = payload.error ? RequestStatus.FAILED : RequestStatus.COMPLETED
  },
  signOut: (state: AuthState, { payload }: PayloadAction<{ error: CustomError | null }>) => {
    state.signOutError = payload.error

    if (!payload.error) {
      state.signOutStatus = RequestStatus.COMPLETED
      state.session = null

      return
    }

    state.signOutStatus = RequestStatus.FAILED
  },
  setLoggedInUserWithLocalData: (
    state: AuthState,
    { payload }: PayloadAction<{ localSessionData: Session }>
  ) => {
    state.session = payload.localSessionData
  },
  magicLink: (state: AuthState, { payload }: PayloadAction<{ error: CustomError | null }>) => {
    state.magicLinkError = payload.error
    state.magicLinkStatus = payload.error ? RequestStatus.FAILED : RequestStatus.COMPLETED
  },
  resetPasswordRequest: (state: AuthState, { payload }: PayloadAction<{ error: CustomError | null }>) => {
    state.resetPasswordRequestError = payload.error
    state.resetPasswordRequestStatus = payload.error ? RequestStatus.FAILED : RequestStatus.COMPLETED
  },
  updatePassword: (state: AuthState, { payload }: PayloadAction<{ error: CustomError | null }>) => {
    state.updatePasswordError = payload.error
    state.updatePasswordStatus = payload.error ? RequestStatus.FAILED : RequestStatus.COMPLETED
  },
  resetAuthStatus: (state: AuthState, { payload }: PayloadAction<{ fields: (keyof AuthState)[] }>) => {
    const s = state as unknown as Record<string, unknown>
    payload.fields.forEach((field) => {
      if (field.endsWith('Status')) {
        s[field] = RequestStatus.IDLE
      } else if (field.endsWith('Error')) {
        s[field] = null
      }
    })
  },
}
