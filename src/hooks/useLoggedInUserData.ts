import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { selectIsLoggedInSession, selectLocalSessionData } from '@/modules/auth/auth.selectors'
import { setSessionFromLocalSessionData } from '@/modules/auth/auth.actions'
import { Session } from '@/types/user'
import { useAppDispatch, useAppSelector } from '@/config/store'

export const useLoggedInUserData = (redirectToSignInPage = true) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isLoggedInSession: boolean = useAppSelector(selectIsLoggedInSession)

  useEffect(() => {
    if (!isLoggedInSession) {
      getLoggedInUserDataOrRedirectToSignInPage()
    }
  })

  const getLoggedInUserDataOrRedirectToSignInPage = () => {
    const localSessionData: Session | null = selectLocalSessionData()

    if (!localSessionData) {
      if (redirectToSignInPage) {
        router.push('/login')
      }
      return
    }

    dispatch(setSessionFromLocalSessionData(localSessionData))
  }

  return {
    isLoggedInSession,
    getLoggedInUserDataOrRedirectToSignInPage,
  }
}
