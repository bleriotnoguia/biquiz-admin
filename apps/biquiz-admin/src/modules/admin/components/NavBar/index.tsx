'use client'

import React, { ReactNode, useState } from 'react'
import { mdiClose, mdiDotsVertical } from '@mdi/js'
import { containerMaxW } from '@/config'
import Icon from '../Icon'
import NavBarItemPlain from './Item/Plain'
import NavBarMenuList from './MenuList'
import { MenuNavBarItem } from '@/modules/admin/interfaces'

type Props = {
  menu: MenuNavBarItem[]
  className: string
  children: ReactNode
}

export default function NavBar({ menu, className = '', children }: Props) {
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false)

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive)
  }

  return (
    <nav
      className={`${className} top-0 inset-x-0 fixed h-14 z-30 transition-position w-screen lg:w-auto
        bg-white/80 backdrop-blur-md border-b border-gray-200/70
        dark:bg-slate-900/80 dark:border-slate-700/70`}
    >
      <div className={`flex lg:items-stretch ${containerMaxW}`}>
        <div className="flex flex-1 items-stretch h-14">{children}</div>
        <div className="flex-none items-stretch flex h-14 lg:hidden">
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            <Icon path={isMenuNavBarActive ? mdiClose : mdiDotsVertical} size="24" />
          </NavBarItemPlain>
        </div>
        <div
          className={`${
            isMenuNavBarActive ? 'block' : 'hidden'
          } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0
            bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200
            lg:w-auto lg:flex lg:static lg:shadow-none lg:border-0
            dark:bg-slate-900/95 dark:border-slate-700`}
        >
          <NavBarMenuList menu={menu} />
        </div>
      </div>
    </nav>
  )
}
