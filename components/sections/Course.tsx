import { BookOpen, Check, CircleDollarSign, Clock, FileSearch, FileText, Info, Laptop, Quote, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SECTION_IDS } from '@/config/site'
import { PROCESS, SOLUTION, TRANSPARENCY } from '@/data/copy'
import { VERIFIED_DOCUMENTS } from '@/data/documents'
import { FEATURES } from '@/data/features'
import { AcesInline } from '../AcesCredential'
import { LevelSection } from '../game/LevelSection'
import { Reveal } from '../game/Reveal'
import { ProcessSteps } from '../ProcessSteps'
import { SectionHeading } from '../SectionHeading'

const FEATURE_ICONS: Record<string, LucideIcon> = { Laptop, Clock, Video, BookOpen, CircleDollarSign }
const BLOCK_ICONS: LucideIcon[] = [FileSearch, FileText, Quote, Info]

/** Nivel 05 — La solución */
export function SolutionSection() {
  return (
    <LevelSection id={SECTION_IDS.formacion} level={5} labelledBy="solution-title">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading level={5} id="solution-title" className="max-w-3xl">
          {SOLUTION.title}
        </SectionHeading>
        <Reveal as="p" delay={100} className="mt-6 max-w-3xl text-lg leading-8 text-soft">
          {SOLUTION.intro}
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Reveal as="h3" className="text-xl font-black">
              {SOLUTION.audienceTitle}
            </Reveal>
            <ul className="mt-5 space-y-3">
              {SOLUTION.audience.map((text, i) => (
                <Reveal as="li" key={text} delay={i * 60} className="card-game flex gap-3 p-4">
                  <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-fire" />
                  <span className="leading-6 text-soft">{text}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal as="p" className="mt-6 text-sm leading-6 text-mute">
              {SOLUTION.note}
            </Reveal>
          </div>

          <div>
            <Reveal as="h3" className="text-2xl font-black sm:text-3xl">
              {SOLUTION.featuresTitle}
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, i) => {
                const Icon = FEATURE_ICONS[feature.icon] ?? BookOpen
                return (
                  <Reveal as="li" key={feature.id} delay={i * 70} className="card-game flex flex-col p-5 last:sm:col-span-2">
                    <span className="grid size-12 place-items-center rounded-xl bg-fire-gradient text-ink">
                      <Icon aria-hidden size={24} />
                    </span>
                    <p className="mt-6 text-lg font-bold leading-snug">{feature.text}</p>
                  </Reveal>
                )
              })}
            </ul>
            <Reveal as="p" className="mt-6 text-sm leading-6 text-mute">
              {SOLUTION.finalText}
            </Reveal>
          </div>
        </div>
      </div>
    </LevelSection>
  )
}

/** Nivel 06 — Cómo funciona */
export function ProcessSection() {
  return (
    <LevelSection id={SECTION_IDS.comoFunciona} level={6} labelledBy="process-title" className="border-y border-line bg-panel/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading level={6} id="process-title" className="max-w-3xl">
          {PROCESS.title}
        </SectionHeading>
        <ProcessSteps />
      </div>
    </LevelSection>
  )
}

/** Nivel 07 — Respaldo y pruebas */
export function TransparencySection() {
  return (
    <LevelSection id={SECTION_IDS.respaldo} level={7} labelledBy="transparency-title">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading level={7} id="transparency-title" className="max-w-3xl">
          {TRANSPARENCY.title}
        </SectionHeading>
        <div className="mt-6 max-w-3xl space-y-3 text-lg leading-8 text-soft">
          {TRANSPARENCY.intro.map((text, i) => (
            <Reveal as="p" key={text} delay={100 + i * 60}>
              {text}
            </Reveal>
          ))}
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {TRANSPARENCY.blocks.map((block, i) => {
            const Icon = BLOCK_ICONS[i] ?? Info
            return (
              <Reveal as="li" key={block.title} delay={i * 70} className="card-game p-6">
                <span className="grid size-11 place-items-center rounded-xl border border-fire/40 bg-fire/10 text-amber">
                  <Icon aria-hidden size={22} />
                </span>
                <h3 className="mt-5 text-xl font-black">{block.title}</h3>
                <p className="mt-3 leading-7 text-soft">{block.text}</p>
                {i === 0 && <AcesInline />}
              </Reveal>
            )
          })}
        </ul>

        {VERIFIED_DOCUMENTS.length > 0 && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {VERIFIED_DOCUMENTS.map((doc) => (
              <li key={doc.id}>
                <a href={doc.href} target="_blank" rel="noopener noreferrer" className="card-game flex items-center gap-3 p-4 font-bold">
                  <FileText aria-hidden size={20} className="text-amber" />
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        <Reveal as="p" className="mt-10 text-lg font-bold text-fg">
          {TRANSPARENCY.closing}
        </Reveal>
      </div>
    </LevelSection>
  )
}
