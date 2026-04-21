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
    router.push('/login')
  }

  const { isLoggedInSession } = useLoggedInUserData(false)

  return isLoggedInSession ? (
    <div className="flex items-center gap-3">
      <Link
        href="/admin"
        className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
      >
        Admin Dashboard
      </Link>
      <button
        onClick={onSignOut}
        className="rounded-lg border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
    >
      Sign in
    </Link>
  )
}
