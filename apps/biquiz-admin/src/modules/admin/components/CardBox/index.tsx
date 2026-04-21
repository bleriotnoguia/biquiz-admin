import React, { ReactNode } from 'react'
import CardBoxComponentBody from './Component/Body'
import CardBoxComponentFooter from './Component/Footer'

type Props = {
  rounded?: string
  flex?: string
  className?: string
  hasComponentLayout?: boolean
  hasTable?: boolean
  isHoverable?: boolean
  isModal?: boolean
  children: ReactNode
  footer?: ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export default function CardBox({
  rounded = 'rounded-2xl',
  flex = 'flex-col',
  className = '',
  hasComponentLayout = false,
  hasTable = false,
  isHoverable = false,
  isModal = false,
  children,
  footer,
  onClick,
}: Props) {
  const componentClass = [
    'bg-white flex',
    className,
    rounded,
    flex,
    isModal ? 'dark:bg-slate-900' : 'dark:bg-slate-800',
    'border border-gray-100 dark:border-slate-700/60',
    isModal ? '' : 'shadow-sm',
  ]

  if (isHoverable) {
    componentClass.push('hover:shadow-md transition-shadow duration-300 cursor-pointer')
  }

  return React.createElement(
    'div',
    { className: componentClass.join(' '), onClick },
    hasComponentLayout ? (
      children
    ) : (
      <>
        <CardBoxComponentBody noPadding={hasTable}>{children}</CardBoxComponentBody>
        {footer && <CardBoxComponentFooter>{footer}</CardBoxComponentFooter>}
      </>
    )
  )
}
