import React, { ReactNode } from 'react'
import UserAvatar from '.'
import { useAppSelector } from '@/config/store'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const userEmail = useAppSelector((state) => state.auth.session.user?.email)

  return (
    <UserAvatar username={userEmail} className={className}>
      {children}
    </UserAvatar>
  )
}
