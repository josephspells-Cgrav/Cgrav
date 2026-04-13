'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  format?: (n: number) => string
}

export function Counter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  format,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    if (!isInView) {
      setCount(0)
      return
    }
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  const display = format ? format(count) : count

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}
