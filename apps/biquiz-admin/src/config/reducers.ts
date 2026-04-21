import { combineReducers, UnknownAction } from '@reduxjs/toolkit'
import { authSlice } from '@/modules/auth/auth.slice'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'

export const appReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
})

type AppState = ReturnType<typeof appReducers>

export const rootReducer = (state: AppState | undefined, action: UnknownAction) => {
  if ((action?.payload as { callType?: string })?.callType === AuthCallTypes.SIGN_OUT) {
    return appReducers({ [authSlice.name]: undefined, ...state } as AppState, action)
  }

  return appReducers(state, action)
}
