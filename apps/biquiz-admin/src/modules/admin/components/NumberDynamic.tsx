'use client'

import React, { useEffect, useRef, useState } from 'react'
import numeral from 'numeral'

type Props = {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

const NumberDynamic = ({ prefix = '', suffix = '', value, duration = 500 }: Props) => {
  const [newValue, setNewValue] = useState(0)
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([])

  const newValueFormatted = newValue < 1000 ? newValue : numeral(newValue).format('0,0')

  const stepDurationMs = 25

  useEffect(() => {
    const growIncrement = value / (duration / stepDurationMs)

    const grow = (current: number) => {
      const next = Math.ceil(current + growIncrement)
      if (next > value) {
        setNewValue(value)
        return
      }
      setNewValue(next)
      timeoutIds.current.push(
        setTimeout(() => grow(next), stepDurationMs)
      )
    }

    grow(0)

    return () => {
      timeoutIds.current.forEach(clearTimeout)
      timeoutIds.current = []
    }
  }, [value, duration])

  return (
    <div>
      {prefix}
      {newValueFormatted}
      {suffix}
    </div>
  )
}

export default NumberDynamic
