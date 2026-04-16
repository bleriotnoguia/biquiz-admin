import { combineReducers, UnknownAction } from '@reduxjs/toolkit'
import { authSlice } from '@/modules/auth/auth.slice'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'
import darkModeReducer from '../slices/darkModeSlice'

export const appReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  darkMode: darkModeReducer,
})

export const rootReducer = (state: any, action: UnknownAction) => {
  if ((action?.payload as any)?.callType === AuthCallTypes.SIGN_OUT) {
    return appReducers({ [authSlice.name]: undefined, ...state }, action)
  }

  return appReducers(state, action)
}
