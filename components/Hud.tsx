'use client'

import { Menu, X, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS, SITE_NAME } from '@/config/site'
import { HUD, TOTAL_LEVELS } from '@/data/gamification'
import { useGame } from './game/GameProvider'

const NAV = [
  { label: 'La formación', id: SECTION_IDS.formacion },
  { label: 'Cómo funciona', id: SECTION_IDS.comoFunciona },
  { label: 'Respaldo y pruebas', id: SECTION_IDS.respaldo },
  { label: 'Oferta', id: SECTION_IDS.oferta },
  { label: 'Preguntas frecuentes', id: SECTION_IDS.faq },
]

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    if (from === target) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = target
      setValue(target)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 500)
      const next = Math.round(from + (target - from) * progress)
      current.current = next
      setValue(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return value
}

/** Barra superior: identidad, navegación y marcador de experiencia (XP) con progreso de scroll. */
export function Hud() {
  const { xp, level, gain } = useGame()
  const shownXp = useAnimatedNumber(xp)
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      const progress = max > 0 ? root.scrollTop / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label={SITE_NAME}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/innova-logo.png" alt="Innova Training" width={381} height={105} className="h-8 w-auto shrink-0" />
          <span className="hidden truncate border-l border-line pl-3 text-sm font-extrabold tracking-tight text-fg md:block">
            {SITE_NAME}
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 text-sm font-semibold text-soft xl:flex">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition hover:text-amber">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="relative flex items-center gap-2 rounded-full border border-fire/40 bg-fire/10 px-3 py-1.5 text-sm font-black text-amber"
            title={`${HUD.level} ${level}/${TOTAL_LEVELS}`}
          >
            <Zap aria-hidden size={15} className="fill-current" />
            <span className="tabular-nums">
              {shownXp} {HUD.xp}
            </span>
            <span className="hidden border-l border-fire/30 pl-2 text-xs font-bold text-soft sm:inline">
              {HUD.level} {level}/{TOTAL_LEVELS}
            </span>
            {gain && (
              <span
                key={gain.key}
                aria-hidden
                className="pointer-events-none absolute -bottom-6 right-2 text-xs font-black text-sun opacity-0 animate-[xp-pop_1.4s_ease-out_forwards]"
              >
                +{gain.points} {HUD.xp}
              </span>
            )}
          </div>
          <button
            ref={toggle}
            type="button"
            aria-label={open ? HUD.menuClose : HUD.menuOpen}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-lg border border-line text-fg transition hover:border-fire xl:hidden"
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal (móvil)" className="border-t border-line bg-panel px-4 py-2 xl:hidden">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3.5 text-sm font-bold text-fg last:border-b-0 hover:text-amber"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div aria-hidden className="h-[3px] w-full bg-line/60">
        <div ref={bar} className="bg-fire-gradient h-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </header>
  )
}
