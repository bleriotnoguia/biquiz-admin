import { Children, cloneElement, ReactElement, ReactNode } from 'react'
import Icon from '../Icon'

type Props = {
  label?: string
  labelFor?: string
  help?: string
  icons?: string[] | null[]
  isBorderless?: boolean
  isTransparent?: boolean
  hasTextareaHeight?: boolean
  children: ReactNode
}

const FormField = ({ icons = [], ...props }: Props) => {
  const childrenCount = Children.count(props.children)

  let elementWrapperClass = ''

  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-2'
      break
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3'
  }

  const controlClassName = [
    'px-3 py-2 max-w-full rounded-lg w-full text-sm',
    'text-slate-800 dark:text-slate-100',
    'placeholder-slate-400 dark:placeholder-slate-500',
    'focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none',
    'transition duration-150',
    props.hasTextareaHeight ? 'h-24' : 'h-10',
    props.isBorderless ? 'border-0' : 'border border-gray-200 dark:border-slate-600',
    props.isTransparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
  ].join(' ')

  return (
    <div className="mb-4 last:mb-0">
      {props.label && (
        <label
          htmlFor={props.labelFor}
          className={`block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5 ${props.labelFor ? 'cursor-pointer' : ''}`}
        >
          {props.label}
        </label>
      )}
      <div className={`${elementWrapperClass}`}>
        {Children.map(props.children, (child: ReactElement, index) => (
          <div className="relative">
            {cloneElement(child, {
              className: `${controlClassName} ${icons[index] ? 'pl-9' : ''}`,
            })}
            {icons[index] && (
              <Icon
                path={icons[index]}
                w="w-9"
                h={props.hasTextareaHeight ? 'h-full' : 'h-10'}
                size="16"
                className="absolute top-0 left-0 z-10 pointer-events-none text-slate-400 dark:text-slate-500"
              />
            )}
          </div>
        ))}
      </div>
      {props.help && (
        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{props.help}</div>
      )}
    </div>
  )
}

export default FormField
