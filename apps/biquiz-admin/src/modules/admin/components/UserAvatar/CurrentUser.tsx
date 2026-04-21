import React, { ReactNode } from 'react'
import UserAvatar from '.'
import { useAppSelector } from '@/config/store'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const userEmail = useAppSelector((state) => state.auth.session.user?.email)
  const avatarUrl = useAppSelector(
    (state) =>
      state.auth.session?.user?.user_metadata?.avatar_url || state.auth.session?.user?.avatar_url || null
  )

  return (
    <UserAvatar username={userEmail} className={className} imageUrl={avatarUrl}>
      {children}
    </UserAvatar>
  )
}
