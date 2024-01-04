'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/modules/auth/auth.actions'
import { useAppDispatch } from '@/config/store'
import { useLoggedInUserData } from '@/hooks/useLoggedInUserData'

export default function AuthButton() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSignOut = async () => {
    await dispatch(signOut())

    await router.push('/login')
  }

  const { isLoggedInSession } = useLoggedInUserData(false)

  return isLoggedInSession ? (
    <div className="flex items-center gap-4 float-right">
      Hey, Bro!
      <form action={onSignOut}>
        <button className="py-2 px-4 text-slate-300 rounded-md no-underline">Logout</button>
      </form>
      <Link href="/admin" className="py-3 px-3 text-slate-300 rounded-md no-underline float-right">
        Admin
      </Link>
    </div>
  ) : (
    <Link href="/login" className="py-3 px-3 text-slate-300 rounded-md no-underline float-right">
      Login
    </Link>
  )
}
