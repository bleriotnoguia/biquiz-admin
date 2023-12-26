import { combineReducers } from 'redux'
import { AnyAction } from '@reduxjs/toolkit'
import { authSlice } from '@/modules/auth/auth.slice'
import { AuthCallTypes } from '@/modules/auth/auth.call-types'
import darkModeReducer from '../stores/darkModeSlice'

export const appReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  darkMode: darkModeReducer,
})

export const rootReducer = (state: any, action: AnyAction) => {
  if (action?.payload?.callType === AuthCallTypes.SIGN_OUT) {
    return appReducers({ auth: undefined, ...state }, action)
  }

  return appReducers(state, action)
}
