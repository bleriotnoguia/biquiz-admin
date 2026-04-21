import React from 'react'
import { ColorKey } from '@/modules/admin/interfaces'
import { colorsText } from '@/colors'
import Icon from '../Icon'
import CardBox from '.'
import NumberDynamic from '../NumberDynamic'

type Props = {
  number: number
  numberPrefix?: string
  numberSuffix?: string
  icon: string
  iconColor: ColorKey
  label: string
  trendLabel?: string
  isLoading?: boolean
}

const iconBgColors: Record<ColorKey, string> = {
  white: 'bg-gray-100',
  light: 'bg-gray-100',
  contrast: 'bg-gray-800',
  success: 'bg-emerald-100 dark:bg-emerald-900/30',
  danger: 'bg-red-100 dark:bg-red-900/30',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30',
  info: 'bg-blue-100 dark:bg-blue-900/30',
}

const CardBoxWidget = (props: Props) => {
  return (
    <CardBox className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {props.label}
          </p>
          {props.isLoading ? (
            <>
              <div className="h-9 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                <NumberDynamic
                  value={props.number}
                  prefix={props.numberPrefix}
                  suffix={props.numberSuffix}
                />
              </h1>
              {props.trendLabel && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{props.trendLabel}</p>
              )}
            </>
          )}
        </div>
        {props.icon && (
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBgColors[props.iconColor] ?? 'bg-gray-100'}`}>
            <Icon path={props.icon} size="28" w="" h="" className={colorsText[props.iconColor]} />
          </div>
        )}
      </div>
    </CardBox>
  )
}

export default CardBoxWidget
