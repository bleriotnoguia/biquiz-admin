import React, { ReactNode } from 'react'

type Props = {
  zIndex?: string
  type?: string
  children?: ReactNode
  className?: string
  onClick: (e: React.MouseEvent) => void
}

export default function OverlayLayer({
  zIndex = 'z-50',
  type = 'flex',
  children,
  className,
  ...props
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <div
      className={`${type} ${zIndex} ${className} items-center flex-col justify-center overflow-hidden fixed inset-0`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClick}
      />

      {children}
    </div>
  )
}
