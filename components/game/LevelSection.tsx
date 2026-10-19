'use client'

import { useEffect, useRef } from 'react'
import { HUD, TOTAL_LEVELS } from '@/data/gamification'
import { useGame } from './GameProvider'

/** Sección que suma experiencia cuando cruza el centro de la pantalla. */
export function LevelSection({
  id,
  level,
  labelledBy,
  className,
  children,
}: {
  id?: string
  level: number
  labelledBy?: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)
  const { markLevel } = useGame()

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markLevel(level)
          observer.disconnect()
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level, markLevel])

  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  )
}

export function LevelChip({ level, className = '' }: { level: number; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-md border border-fire/40 bg-fire/10 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-amber ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-fire shadow-[0_0_10px_2px_var(--color-fire)]" />
      {HUD.level} {String(level).padStart(2, '0')}
      <span className="text-mute/80">/ {TOTAL_LEVELS}</span>
    </p>
  )
}
