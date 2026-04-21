import React, { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
}

const CardBoxComponentTitle = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>
      {children}
    </div>
  )
}

export default CardBoxComponentTitle
