'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import Divider from '../../Divider'
import Icon from '../../Icon'
import UserAvatarCurrentUser from '../../UserAvatar/CurrentUser'
import NavBarMenuList from '../MenuList'
import { MenuNavBarItem } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '@/config/store'
import { signOut } from '@/modules/auth/auth.actions'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useRouter } from 'next/navigation'
import LogoutConfirmModal from '../../LogoutConfirmModal'

type Props = {
  item: MenuNavBarItem
}

export default function NavBarItem({ item }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const dropdownRootRef = useRef<HTMLDivElement | null>(null)
  const { setDarkMode } = useDarkMode()

  const userName = useAppSelector((state) => state.auth.session.user?.name)

  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false)

  useEffect(() => {
    if (!isDropdownActive) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRootRef.current) return

      if (!dropdownRootRef.current.contains(event.target as Node)) {
        setIsDropdownActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownActive])

  const handleLogoutConfirm = async () => {
    await dispatch(signOut())
    setIsLogoutModalActive(false)
    router.push('/login')
  }

  const componentClass = [
    'block lg:flex items-center relative cursor-pointer',
    isDropdownActive
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
    item.isDesktopNoLabel ? 'lg:w-16 lg:justify-center' : '',
  ].join(' ')

  const itemLabel = item.isCurrentUser ? userName : item.label

  const handleMenuClick = async () => {
    if (item.isLogout) {
      setIsLogoutModalActive(true)
      return
    }

    if (item.menu) {
      setIsDropdownActive(!isDropdownActive)
    }

    if (item.isToggleLightDark) {
      setDarkMode(null)
    }
  }

  const NavBarItemComponentContents = (
    <>
      <div
        className={`flex items-center ${
          item.menu
            ? 'bg-gray-100 dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent p-3 lg:p-0'
            : ''
        }`}
        onClick={() => void handleMenuClick()}
      >
        {item.isCurrentUser && <UserAvatarCurrentUser className="w-6 h-6 mr-3 inline-flex" />}
        {item.icon && <Icon path={item.icon} className="transition-colors" />}
        <span
          className={`px-2 transition-colors ${
            item.isDesktopNoLabel && item.icon ? 'lg:hidden' : ''
          }`}
        >
          {itemLabel}
        </span>
        {item.menu && (
          <Icon
            path={isDropdownActive ? mdiChevronUp : mdiChevronDown}
            className="hidden lg:inline-flex transition-colors"
          />
        )}
      </div>
      {item.menu && (
        <div
          className={`${
            !isDropdownActive ? 'lg:hidden' : ''
          } text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-40 lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700`}
        >
          <NavBarMenuList menu={item.menu} />
        </div>
      )}
      <LogoutConfirmModal
        isActive={isLogoutModalActive}
        onConfirm={() => void handleLogoutConfirm()}
        onCancel={() => setIsLogoutModalActive(false)}
      />
    </>
  )

  if (item.isDivider) {
    return <Divider navBar />
  }

  if (item.href) {
    return (
      <Link href={item.href} target={item.target} className={componentClass}>
        {NavBarItemComponentContents}
      </Link>
    )
  }

  return (
    <div ref={dropdownRootRef} className={componentClass}>
      {NavBarItemComponentContents}
    </div>
  )
}
