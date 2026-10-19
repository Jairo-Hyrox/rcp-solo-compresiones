import { Check } from 'lucide-react'
import { NARRATIVE, PREPARATION, REVELATION } from '@/data/copy'
import { LevelSection } from '../game/LevelSection'
import { Reveal } from '../game/Reveal'
import { RhythmGame } from '../RhythmGame'
import { SectionHeading } from '../SectionHeading'

/** Nivel 02 — Apertura narrativa */
export function NarrativeSection() {
  return (
    <LevelSection level={2} labelledBy="narrative-title" className="border-y border-line bg-panel/50">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
        <SectionHeading level={2} id="narrative-title">
          {NARRATIVE.title}
        </SectionHeading>

        <ol className="relative mt-12 space-y-6 border-l-2 border-line pl-7 sm:pl-9">
          {NARRATIVE.paragraphs.map((text, i) => (
            <Reveal as="li" key={text} delay={i * 40} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.2rem] top-2.5 size-3 rounded-full bg-fire shadow-[0_0_12px_2px_var(--color-fire)] sm:-left-[2.7rem]"
              />
              <p className={i === 2 || i === 3 ? 'text-xl font-bold leading-8 text-fg' : 'text-lg leading-8 text-soft'}>{text}</p>
            </Reveal>
          ))}
        </ol>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {NARRATIVE.closing.map((text, i) => (
            <Reveal as="li" key={text} delay={i * 80} className="card-game flex gap-3 p-5">
              <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-fire" />
              <span className="font-semibold leading-6">{text}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </LevelSection>
  )
}

/** Nivel 03 — La falsa sensación de preparación */
export function PreparationSection() {
  return (
    <LevelSection level={3} labelledBy="prep-title" className="relative overflow-hidden bg-[#08080a]">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:py-28 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="min-w-0">
          <SectionHeading level={3} id="prep-title">
            {PREPARATION.title}
          </SectionHeading>
          {/* Elemento gráfico abstracto, discreto */}
          <div aria-hidden className="relative mt-12 grid size-56 place-items-center sm:size-72">
            <span className="absolute inset-0 rounded-full border border-dashed border-line animate-[spin-slow_40s_linear_infinite]" />
            <span className="absolute inset-6 rounded-full border border-fire/30" />
            <span className="absolute inset-12 rounded-full border border-dashed border-fire/40 animate-[spin-slow_28s_linear_infinite_reverse]" />
            <span className="absolute inset-[4.5rem] rounded-full bg-fire/10 blur-md" />
            <span className="size-4 rounded-full bg-fire shadow-[0_0_30px_8px_var(--color-fire)]" />
          </div>
        </div>

        <div className="min-w-0 space-y-6 text-lg leading-8 text-soft lg:pt-6">
          {PREPARATION.paragraphs.map((text, i) => (
            <Reveal as="p" key={text} delay={i * 40} className={i === 4 || i === 5 ? 'text-2xl font-black leading-9 text-amber' : ''}>
              {text}
            </Reveal>
          ))}
          <Reveal className="card-game mt-4 space-y-3 p-6">
            {PREPARATION.closing.map((text) => (
              <p key={text} className="font-semibold text-fg">
                {text}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </LevelSection>
  )
}

/** Nivel 04 — La revelación (incluye el mini juego de ritmo) */
export function RevelationSection() {
  const split = REVELATION.title.indexOf('Necesitas')
  const first = REVELATION.title.slice(0, split)
  const second = REVELATION.title.slice(split)

  return (
    <LevelSection level={4} labelledBy="revelation-title" className="relative overflow-hidden border-y border-fire/30">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1a0b04] via-ink to-ink" />
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-fire/25 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:py-28">
        <SectionHeading level={4} id="revelation-title" align="center">
          {first}
          <span className="text-fire-gradient">{second}</span>
        </SectionHeading>

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-lg leading-8 text-soft">
          {REVELATION.paragraphs.map((text, i) => (
            <Reveal as="p" key={text} delay={i * 30} className={i === 3 ? 'text-2xl font-black text-fg' : ''}>
              {text}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <RhythmGame />
        </Reveal>
      </div>
    </LevelSection>
  )
}
