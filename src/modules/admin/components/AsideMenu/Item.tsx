'use client'

import React, { useEffect, useState } from 'react'
import { mdiMinus, mdiPlus } from '@mdi/js'
import Icon from '../Icon'
import Link from 'next/link'
import { getButtonColor } from '@/colors'
import AsideMenuList from './List'
import { MenuAsideItem } from '@/modules/admin/interfaces'
import { usePathname } from 'next/navigation'

type Props = {
  item: MenuAsideItem
  isDropdownList?: boolean
}

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (item.href && pathname) {
      const linkPathName = new URL(item.href, location.href).pathname
      setIsLinkActive(linkPathName === pathname)
    }
  }, [item.href, pathname])

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <Icon
          path={item.icon}
          className={`flex-none transition-colors`}
          w="w-10"
          size="18"
        />
      )}
      <span className={`grow text-ellipsis line-clamp-1 text-sm font-medium ${item.menu ? '' : 'pr-4'}`}>
        {item.label}
      </span>
      {item.menu && (
        <Icon
          path={isDropdownActive ? mdiMinus : mdiPlus}
          className={`flex-none`}
          w="w-8"
          size="16"
        />
      )}
    </>
  )

  if (item.color) {
    const colorClass = `flex cursor-pointer rounded-lg py-2.5 px-3 transition-all duration-150 ${getButtonColor(item.color, false, true)}`
    return (
      <li>
        {item.href ? (
          <Link href={item.href} target={item.target} className={colorClass}>
            {asideMenuItemInnerContents}
          </Link>
        ) : (
          <div className={colorClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
            {asideMenuItemInnerContents}
          </div>
        )}
      </li>
    )
  }

  const baseClass = `flex cursor-pointer rounded-lg py-2.5 px-3 transition-all duration-150`
  const activeClass = isLinkActive
    ? 'aside-menu-item aside-menu-item-active'
    : 'aside-menu-item'

  const componentClass = [
    baseClass,
    isDropdownList ? 'text-sm pl-8' : '',
    `${activeClass} dark:text-slate-300 dark:hover:text-white`,
  ].join(' ')

  return (
    <li className="mb-1">
      {item.href && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && (
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`aside-menu-dropdown ${
            isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden'
          }`}
          isDropdownList
        />
      )}
    </li>
  )
}

export default AsideMenuItem
