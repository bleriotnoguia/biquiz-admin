import React, { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode
}

export default function CardBoxComponentFooter({ className, children }: Props) {
  return (
    <footer className={`px-6 py-4 border-t border-gray-100 dark:border-slate-700 ${className ?? ''}`}>
      {children}
    </footer>
  )
}
