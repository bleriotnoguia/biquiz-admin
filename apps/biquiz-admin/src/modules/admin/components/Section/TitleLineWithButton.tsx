import React, { Children, ReactNode } from 'react'
import Icon from '../Icon'

type Props = {
  icon: string
  title: string
  main?: boolean
  children?: ReactNode
}

export default function SectionTitleLineWithButton({ icon, title, main = false, children }: Props) {
  const hasChildren = !!Children.count(children)

  return (
    <section className={`${main ? '' : 'pt-6'} mb-6 flex items-center justify-between`}>
      <div className="flex items-center justify-start gap-3">
        {icon && (
          <div className={`${main ? 'w-10 h-10' : 'w-8 h-8'} rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0`}>
            <Icon path={icon} size={main ? '20' : '16'} w="" h="" className="text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
        <h1 className={`font-bold text-slate-800 dark:text-white leading-tight ${main ? 'text-2xl' : 'text-xl'}`}>
          {title}
        </h1>
      </div>
      {hasChildren && children}
    </section>
  )
}
