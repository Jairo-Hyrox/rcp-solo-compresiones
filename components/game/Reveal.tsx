'use client'

import { createElement, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'p' | 'li' | 'h1' | 'h2' | 'h3' | 'span'

/** Hace aparecer el contenido al entrar en pantalla. Sin JavaScript (o con movimiento reducido) todo se ve desde el inicio. */
export function Reveal({
  as = 'div',
  id,
  delay = 0,
  className,
  children,
}: {
  as?: Tag
  id?: string
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in')
      return
    }
    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect()
          // Quita el retardo escalonado una vez mostrado, para que el hover no llegue con demora.
          if (delay) timer = window.setTimeout(() => (el.style.transitionDelay = ''), delay + 700)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [delay])

  return createElement(
    as,
    {
      ref,
      id,
      className: cn('reveal', className),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  )
}
