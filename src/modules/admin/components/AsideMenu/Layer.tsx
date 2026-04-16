'use client'

import React, { useState } from 'react'
import { mdiClose, mdiInformationOutline, mdiLogout } from '@mdi/js'
import Icon from '../Icon'
import AsideMenuItem from './Item'
import AsideMenuList from './List'
import AboutModal from '../AboutModal'
import { MenuAsideItem } from '@/modules/admin/interfaces'
import { useAppSelector } from '@/config/store'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const darkMode = useAppSelector((state) => state.darkMode.isEnabled)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <>
      <aside
        className={`${className} lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
      >
        <div
          className={`aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900`}
        >
          {/* Brand / Logo */}
          <div
            className={`aside-brand flex flex-row h-16 items-center justify-between px-4 dark:bg-slate-900`}
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <div>
                <b className="font-black text-white text-sm tracking-wide">Biquiz</b>
                <p className="text-slate-400 text-xs leading-none">Admin</p>
              </div>
            </div>
            <button
              className="hidden lg:inline-block xl:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              onClick={handleAsideLgCloseClick}
            >
              <Icon path={mdiClose} size="18" />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-white/10 mb-2" />

          {/* Menu */}
          <div
            className={`flex-1 overflow-y-auto overflow-x-hidden px-3 ${
              darkMode ? 'aside-scrollbars-[slate]' : 'aside-scrollbars'
            }`}
          >
            <AsideMenuList menu={menu} />
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-white/10 mt-2" />

          {/* About + Logout */}
          <div className="px-3 py-3 space-y-1">
            {/* About button */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="w-full flex items-center gap-0 rounded-lg py-2.5 px-3 transition-all duration-150 aside-menu-item dark:text-slate-300 dark:hover:text-white text-sm font-medium cursor-pointer"
            >
              <span className="inline-flex justify-center items-center w-10 h-6">
                <svg viewBox="0 0 24 24" width="18" height="18" className="inline-block">
                  <path fill="currentColor" d={mdiInformationOutline} />
                </svg>
              </span>
              <span className="grow text-left">About</span>
            </button>

            {/* Logout */}
            <ul>
              <AsideMenuItem item={logoutItem} />
            </ul>
          </div>
        </div>
      </aside>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}
