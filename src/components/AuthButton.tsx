'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/modules/auth/auth.actions'
import { selectIsLoggedInSession } from '@/modules/auth/auth.selectors'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'

export default function AuthButton() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSignOut = async () => {
    await dispatch(signOut())

    await router.push('/sign-in')
  }

  const isLoggedInSession: boolean = useAppSelector(selectIsLoggedInSession)

  return isLoggedInSession ? (
    <div className="flex items-center gap-4">
      Hey, Bro!
      <form action={onSignOut}>
        <button className="py-2 px-4 text-slate-300 rounded-md no-underline float-right">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="py-3 px-3 text-slate-300 rounded-md no-underline float-right">
      Login
    </Link>
  )
}
