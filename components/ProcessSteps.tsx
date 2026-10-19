'use client'

import { Check } from 'lucide-react'
import { PROCESS } from '@/data/copy'
import { HUD, STEP_UI } from '@/data/gamification'
import { cn } from '@/lib/utils'
import { useGame } from './game/GameProvider'
import { Reveal } from './game/Reveal'

/**
 * Los cinco pasos están siempre visibles. Marcar un paso como revisado es opcional:
 * solo suma experiencia y nunca bloquea nada.
 */
export function ProcessSteps() {
  const { steps, toggleStep } = useGame()
  const total = PROCESS.steps.length
  const reviewed = steps.filter(Boolean).length

  return (
    <div>
      <div className="mt-8 flex items-center gap-4" aria-label={`${reviewed}/${total} ${STEP_UI.progress}`}>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="bg-fire-gradient h-full rounded-full transition-[width] duration-500"
            style={{ width: `${(reviewed / total) * 100}%` }}
          />
        </div>
        <p className="shrink-0 text-sm font-bold tabular-nums text-soft">
          {reviewed}/{total} {STEP_UI.progress}
        </p>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROCESS.steps.map((step, i) => {
          const done = steps[i]
          return (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 70}
              className={cn(
                'card-game flex flex-col p-5 last:sm:col-span-2 last:lg:col-span-1',
                done && 'border-fire/70 bg-fire/[0.07]',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex w-fit items-center rounded-md px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em]',
                    done ? 'bg-fire-gradient text-ink' : 'bg-line text-amber',
                  )}
                >
                  {step.label}
                </span>
                <span className={cn('text-xs font-black tabular-nums', done ? 'text-sun' : 'text-mute')}>+20 {HUD.xp}</span>
              </div>
              <h3 className="mt-4 text-lg font-black leading-snug">{step.title}</h3>
              <div className="mt-3 flex-1 space-y-2 text-sm leading-6 text-soft">
                {step.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                aria-pressed={done}
                onClick={() => toggleStep(i)}
                className={cn(
                  'mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-extrabold transition',
                  done
                    ? 'border-fire bg-fire/15 text-amber'
                    : 'border-line text-soft hover:border-fire hover:text-fg',
                )}
              >
                <span
                  aria-hidden
                  className={cn('grid size-4 place-items-center rounded-full border', done ? 'border-fire bg-fire text-ink' : 'border-mute')}
                >
                  {done && <Check size={11} strokeWidth={4} />}
                </span>
                {done ? STEP_UI.done : STEP_UI.mark}
              </button>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}
