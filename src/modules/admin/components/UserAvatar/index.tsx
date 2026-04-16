/* eslint-disable @next/next/no-img-element */
// Why disabled:
// api.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React, { ReactNode } from 'react'

type Props = {
  username: string
  api?: string
  className?: string
  children?: ReactNode
}

export default function UserAvatar({
  username,
  api = 'avataaars',
  className = '',
  children,
}: Props) {
  const avatarImage = `https://api.dicebear.com/7.x/${api}/svg?seed=${username.replace(
    /[^a-z0-9]+/gi,
    '-'
  )}`

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={avatarImage}
        alt={username}
        className="block w-full h-full object-cover bg-gray-100 dark:bg-slate-800"
      />
      {children}
    </div>
  )
}
