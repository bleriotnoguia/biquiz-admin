import React, { ReactNode } from 'react'
import { BgKey } from '@/modules/admin/interfaces'
import { gradientBgPurplePink, gradientBgDark, gradientBgPinkRed } from '@/colors'
import { useDarkMode } from '@/contexts/DarkModeContext'

type Props = {
  bg: BgKey
  children: ReactNode
}

export default function SectionFullScreen({ bg, children }: Props) {
  const { isDarkMode: darkMode } = useDarkMode()

  let componentClass = 'flex min-h-screen items-center justify-center '

  if (darkMode) {
    componentClass += gradientBgDark
  } else if (bg === 'purplePink') {
    componentClass += gradientBgPurplePink
  } else if (bg === 'pinkRed') {
    componentClass += gradientBgPinkRed
  }

  return <div className={componentClass}>{children}</div>
}
