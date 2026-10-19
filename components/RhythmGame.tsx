'use client'

import { Activity, Check, HeartPulse, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RHYTHM } from '@/data/gamification'
import { cn } from '@/lib/utils'
import { useGame } from './game/GameProvider'

const MIN_BPM = 100
const MAX_BPM = 120
const GUIDE_BPM = 110
const GOAL = 10
const GAUGE_MIN = 60
const GAUGE_MAX = 160

type Status = 'waiting' | 'slow' | 'ok' | 'fast'

function statusOf(bpm: number | null): Status {
  if (bpm === null) return 'waiting'
  if (bpm < MIN_BPM) return 'slow'
  if (bpm > MAX_BPM) return 'fast'
  return 'ok'
}

const pct = (bpm: number) => Math.min(100, Math.max(0, ((bpm - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100))

/** Mini juego: medir el ritmo de pulsaciones frente al rango de referencia de 100–120 por minuto. */
export function RhythmGame() {
  const { award } = useGame()
  const taps = useRef<number[]>([])
  const streakRef = useRef(0)
  const doneRef = useRef(false)
  const lastTap = useRef(0)
  const soundRef = useRef(false)
  const audio = useRef<AudioContext | null>(null)

  const [bpm, setBpm] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)
  const [guide, setGuide] = useState(false)
  const [sound, setSound] = useState(false)
  const [beat, setBeat] = useState(0)
  const [press, setPress] = useState(0)
  const [announce, setAnnounce] = useState('')

  const status = statusOf(bpm)
  const statusText = {
    waiting: RHYTHM.waiting,
    slow: RHYTHM.slow,
    ok: RHYTHM.inRange,
    fast: RHYTHM.fast,
  }[status]

  const beep = useCallback(() => {
    try {
      const ctx = audio.current
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } catch {
      /* el sonido es opcional */
    }
  }, [])

  const registerTap = useCallback(() => {
    const now = performance.now()
    if (now - lastTap.current < 40) return // evita contar dos veces el mismo gesto
    lastTap.current = now

    const list = taps.current
    if (list.length && now - list[list.length - 1] > 2000) {
      list.length = 0
      streakRef.current = 0
      setStreak(0)
    }
    list.push(now)
    if (list.length > 9) list.shift()
    setPress((value) => value + 1)

    if (list.length >= 4) {
      let total = 0
      for (let i = 1; i < list.length; i++) total += list[i] - list[i - 1]
      const value = Math.round(60000 / (total / (list.length - 1)))
      setBpm(value)
      const inRange = value >= MIN_BPM && value <= MAX_BPM
      streakRef.current = inRange ? streakRef.current + 1 : 0
      setStreak(streakRef.current)
      if (streakRef.current >= GOAL && !doneRef.current) {
        doneRef.current = true
        setDone(true)
        award('rhythm-challenge', 30)
      }
    }
  }, [award])

  const reset = () => {
    taps.current = []
    streakRef.current = 0
    setBpm(null)
    setStreak(0)
  }

  const toggleSound = () => {
    const next = !sound
    if (next && !audio.current) {
      try {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (Ctor) audio.current = new Ctor()
      } catch {
        /* sin audio disponible */
      }
    }
    if (next) void audio.current?.resume()
    soundRef.current = next
    setSound(next)
  }

  // Guía de ritmo a 110 por minuto (visual y, si se activa, sonora).
  useEffect(() => {
    if (!guide) return
    const tick = () => {
      setBeat((value) => value + 1)
      if (soundRef.current) beep()
    }
    tick()
    const id = window.setInterval(tick, 60000 / GUIDE_BPM)
    return () => window.clearInterval(id)
  }, [guide, beep])

  useEffect(() => () => void audio.current?.close(), [])

  // Anuncio para lectores de pantalla solo cuando cambia el estado (no en cada pulsación).
  useEffect(() => {
    setAnnounce(bpm === null ? '' : `${bpm} ${RHYTHM.perMinute}. ${statusText}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const statusStyle = {
    waiting: 'text-mute',
    slow: 'text-amber',
    ok: 'text-ok',
    fast: 'text-ember',
  }[status]

  return (
    <div className="card-game overflow-hidden p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-amber">
            <Activity aria-hidden size={14} />
            {RHYTHM.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{RHYTHM.title}</h3>
          <p className="mt-3 max-w-xl leading-7 text-soft">{RHYTHM.intro}</p>

          {/* Medidor */}
          <div className="mt-6">
            <div className="flex items-end gap-2">
              <span className={cn('text-6xl font-black leading-none tabular-nums sm:text-7xl', statusStyle)}>
                {bpm ?? '--'}
              </span>
              <span className="pb-2 text-sm font-semibold text-mute">{RHYTHM.perMinute}</span>
            </div>
            <div className="relative mt-4 h-3 rounded-full bg-line" aria-hidden>
              <div
                className="absolute inset-y-0 rounded-full bg-ok/30 ring-1 ring-ok/60"
                style={{ left: `${pct(MIN_BPM)}%`, width: `${pct(MAX_BPM) - pct(MIN_BPM)}%` }}
              />
              {bpm !== null && (
                <div
                  className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-fire shadow-[0_0_14px_2px_var(--color-fire)] transition-[left] duration-300"
                  style={{ left: `${pct(bpm)}%` }}
                />
              )}
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold tabular-nums text-mute" aria-hidden>
              <span>{GAUGE_MIN}</span>
              <span>
                {MIN_BPM}–{MAX_BPM}
              </span>
              <span>{GAUGE_MAX}</span>
            </div>
            <p className={cn('mt-3 flex items-center gap-2 text-sm font-bold', statusStyle)}>
              {status === 'ok' && <Check aria-hidden size={16} />}
              {statusText}
            </p>
            <p className="sr-only" role="status" aria-live="polite">
              {announce}
            </p>
          </div>

          {/* Reto */}
          <div className="mt-5">
            <p className="flex items-center gap-2 text-sm font-bold text-soft">
              {done ? <Trophy aria-hidden size={16} className="text-sun" /> : null}
              {done ? RHYTHM.challengeDone : RHYTHM.challenge}
            </p>
            <div className="mt-2 flex gap-1.5" aria-hidden>
              {Array.from({ length: GOAL }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-2 flex-1 rounded-full transition-colors duration-300',
                    i < streak || done ? 'bg-fire-gradient' : 'bg-line',
                  )}
                />
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-mute">{RHYTHM.disclaimer}</p>
        </div>

        {/* Botón de pulsar */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative grid size-52 place-items-center sm:size-60">
            {guide && (
              <span
                key={beat}
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-sun/80 animate-[beat-ring_0.55s_ease-out_forwards]"
              />
            )}
            <span aria-hidden className="absolute inset-3 rounded-full border border-fire/30" />
            <button
              type="button"
              aria-label={`${RHYTHM.tapLabel}. ${RHYTHM.tapHint}`}
              onPointerDown={(event) => {
                if (event.pointerType === 'mouse' && event.button !== 0) return
                event.preventDefault()
                registerTap()
              }}
              onKeyDown={(event) => {
                if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
                  event.preventDefault()
                  registerTap()
                }
              }}
              onKeyUp={(event) => {
                if (event.key === ' ' || event.key === 'Enter') event.preventDefault()
              }}
              onClick={(event) => {
                // Activación sin puntero (lectores de pantalla): detail === 0
                if (event.detail === 0) registerTap()
              }}
              className="relative grid size-40 touch-manipulation select-none place-items-center rounded-full bg-fire-gradient text-ink shadow-[0_0_0_6px_rgb(242_111_26/0.18),0_20px_50px_-10px_rgb(242_111_26/0.8)] transition-transform active:scale-95 sm:size-48"
            >
              <span key={press} className="grid place-items-center animate-[tap-press_0.25s_ease-out]">
                <HeartPulse aria-hidden size={64} strokeWidth={2.4} />
              </span>
            </button>
          </div>
          <p className="max-w-[16rem] text-center text-sm font-bold text-fg">
            {RHYTHM.tapLabel}
            <span className="mt-1 block text-xs font-medium text-mute">{RHYTHM.tapHint}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setGuide((value) => !value)} aria-pressed={guide} className="btn-ghost">
              <Activity aria-hidden size={16} />
              {guide ? RHYTHM.guideOn : RHYTHM.guideOff}
            </button>
            <button type="button" onClick={toggleSound} aria-pressed={sound} className="btn-ghost">
              {sound ? <Volume2 aria-hidden size={16} /> : <VolumeX aria-hidden size={16} />}
              {sound ? RHYTHM.soundOn : RHYTHM.soundOff}
            </button>
            <button type="button" onClick={reset} className="btn-ghost">
              <RotateCcw aria-hidden size={16} />
              {RHYTHM.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
