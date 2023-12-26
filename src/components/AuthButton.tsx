'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setSessionFromLocalSessionData, signOut } from '@/modules/auth/auth.actions'
import { selectIsLoggedInSession, selectLocalSessionData } from '@/modules/auth/auth.selectors'
import { useAppDispatch, useAppSelector } from '@/config/store'
import { Session } from '@/types/user'
import { useEffect } from 'react'

export default function AuthButton() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSignOut = async () => {
    await dispatch(signOut())

    await router.push('/login')
  }

  const isLoggedInSession: boolean = useAppSelector(selectIsLoggedInSession)

  useEffect(() => {
    if (!isLoggedInSession) getLoggedInUserDataOrRedirectToSignInPage()
  })

  const getLoggedInUserDataOrRedirectToSignInPage = () => {
    const localSessionData: Session | null = selectLocalSessionData()

    if (!localSessionData) {
      router.push('/login')
      return
    }

    dispatch(setSessionFromLocalSessionData(localSessionData))
  }

  return isLoggedInSession ? (
    <div className="flex items-center gap-4 float-right">
      Hey, Bro!
      <form action={onSignOut}>
        <button className="py-2 px-4 text-slate-300 rounded-md no-underline">Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="py-3 px-3 text-slate-300 rounded-md no-underline float-right">
      Login
    </Link>
  )
}
