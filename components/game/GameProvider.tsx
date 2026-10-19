'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

interface Gain {
  key: number
  points: number
}

interface GameContextValue {
  xp: number
  level: number
  gain: Gain | null
  steps: boolean[]
  award: (id: string, points: number) => void
  markLevel: (level: number) => void
  toggleStep: (index: number) => void
}

const GameContext = createContext<GameContextValue | null>(null)

/**
 * Estado ligero del "juego": puntos de experiencia (XP) y niveles vistos.
 * Es solo una capa visual: no bloquea contenido ni condiciona ningún botón.
 */
export function GameProvider({ stepCount, children }: { stepCount: number; children: React.ReactNode }) {
  const [xp, setXp] = useState(0)
  const [seen, setSeen] = useState<number[]>([])
  const [gain, setGain] = useState<Gain | null>(null)
  const [steps, setSteps] = useState<boolean[]>(() => Array.from({ length: stepCount }, () => false))
  const awarded = useRef(new Set<string>())
  const counter = useRef(0)

  const award = useCallback((id: string, points: number) => {
    if (awarded.current.has(id)) return
    awarded.current.add(id)
    counter.current += 1
    setXp((value) => value + points)
    setGain({ key: counter.current, points })
  }, [])

  const markLevel = useCallback(
    (level: number) => {
      setSeen((prev) => (prev.includes(level) ? prev : [...prev, level]))
      award(`level-${level}`, 10)
    },
    [award],
  )

  const toggleStep = useCallback(
    (index: number) => {
      const next = !steps[index]
      setSteps((prev) => prev.map((value, i) => (i === index ? next : value)))
      if (next) award(`step-${index}`, 20)
    },
    [steps, award],
  )

  const value = useMemo<GameContextValue>(
    () => ({ xp, level: seen.length, gain, steps, award, markLevel, toggleStep }),
    [xp, seen.length, gain, steps, award, markLevel, toggleStep],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider')
  return ctx
}
