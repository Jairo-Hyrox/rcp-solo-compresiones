import { Check, ChevronDown } from 'lucide-react'
import { CONTACT_HREF, SECTION_IDS, SITE_NAME } from '@/config/site'
import { FAQ_TITLE, FINAL_CTA, OFFER } from '@/data/copy'
import { FAQ_ITEMS } from '@/data/faq'
import { AcesFooterMark } from '../AcesCredential'
import { EventCard } from '../EventCard'
import { LevelSection } from '../game/LevelSection'
import { Reveal } from '../game/Reveal'
import { PrimaryCta } from '../PrimaryCta'
import { SectionHeading } from '../SectionHeading'

/** Nivel 08 — Oferta */
export function OfferSection() {
  return (
    <LevelSection id={SECTION_IDS.oferta} level={8} labelledBy="offer-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-[#140a05] to-ink" />
      <div aria-hidden className="absolute left-1/2 top-1/3 size-[36rem] max-w-full -translate-x-1/2 rounded-full bg-fire/20 blur-[130px]" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <Reveal className="bg-fire-gradient rounded-[2rem] p-[2px] shadow-[0_30px_90px_-30px_rgb(242_111_26/0.8)]">
          <div className="rounded-[calc(2rem-2px)] bg-panel p-6 sm:p-11">
            <SectionHeading level={8} id="offer-title">
              {OFFER.title}
            </SectionHeading>

            <p className="mt-8 text-lg font-bold text-soft">{OFFER.name}</p>
            <p className="text-fire-gradient mt-1 break-words text-3xl font-black tracking-tight sm:text-4xl">{OFFER.price}</p>

            <EventCard className="mt-6 bg-ink/40" />

            <p className="mt-8 font-extrabold text-fg">{OFFER.includesTitle}</p>
            <ul className="mt-4 space-y-3">
              {OFFER.includes.map((text) => (
                <li key={text} className="flex gap-3 leading-7 text-soft">
                  <Check aria-hidden size={20} className="mt-1 shrink-0 text-fire" />
                  {text}
                </li>
              ))}
            </ul>

            <p className="mt-8 leading-7 text-soft">{OFFER.transparency}</p>
            <div className="mt-4 space-y-1 leading-7 text-fg">
              {OFFER.decide.map((text) => (
                <p key={text} className="font-bold">
                  {text}
                </p>
              ))}
            </div>

            <PrimaryCta href={CONTACT_HREF} icon="whatsapp" className="mt-8 w-full">
              {OFFER.cta}
            </PrimaryCta>
            <p className="mt-4 text-center text-sm leading-6 text-mute">{OFFER.microcopy}</p>
          </div>
        </Reveal>
      </div>
    </LevelSection>
  )
}

/** Nivel 09 — Preguntas frecuentes */
export function FaqSection() {
  return (
    <LevelSection id={SECTION_IDS.faq} level={9} labelledBy="faq-title" className="border-y border-line bg-panel/50">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <SectionHeading level={9} id="faq-title">
          {FAQ_TITLE}
        </SectionHeading>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={(i % 5) * 40}>
              <details className="group card-game open:border-fire/60 open:shadow-[0_18px_40px_-26px_rgb(242_111_26/0.8)] hover:translate-y-0">
                <summary className="flex cursor-pointer items-center gap-4 rounded-[1.25rem] p-5 font-bold leading-snug">
                  <span aria-hidden className="shrink-0 text-xs font-black tabular-nums text-fire">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 break-words">{item.question}</span>
                  <ChevronDown aria-hidden size={20} className="shrink-0 text-amber transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="border-t border-line px-5 pb-5 pt-4 leading-7 text-soft sm:pl-14">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </LevelSection>
  )
}

/** Nivel 10 — CTA final */
export function FinalCtaSection() {
  return (
    <LevelSection level={10} labelledBy="final-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-[#1c0d05] to-[#2a1105]" />
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute bottom-0 left-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-fire/30 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-28">
        <SectionHeading level={10} id="final-title" align="center">
          {FINAL_CTA.title}
        </SectionHeading>

        <div className="mx-auto mt-8 max-w-2xl space-y-3 text-lg leading-8 text-soft">
          {FINAL_CTA.paragraphs.map((text, i) => (
            <Reveal as="p" key={text} delay={i * 60}>
              {text}
            </Reveal>
          ))}
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-5">
          <Reveal as="li" className="bg-fire-gradient col-span-2 rounded-[1.25rem] p-4 text-sm font-black text-ink sm:col-span-1">
            {FINAL_CTA.summaryName}
          </Reveal>
          {FINAL_CTA.summary.map((text, i) => (
            <Reveal as="li" key={text} delay={(i + 1) * 60} className="card-game p-4 text-sm font-bold text-fg">
              {text}
            </Reveal>
          ))}
        </ul>

        <EventCard className="mx-auto mt-6 max-w-xl bg-ink/50 text-left" />

        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-soft">{FINAL_CTA.text}</p>
        <div className="mt-8 flex justify-center">
          <PrimaryCta href={CONTACT_HREF} icon="whatsapp">
            {FINAL_CTA.cta}
          </PrimaryCta>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-6 text-mute">{FINAL_CTA.closing}</p>
      </div>
    </LevelSection>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#070708] px-5 py-10 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/innova-logo.png" alt="Innova Training" width={381} height={105} className="mx-auto h-9 w-auto opacity-90" />
      <p className="mt-4 text-sm font-bold text-soft">{SITE_NAME}</p>
      <AcesFooterMark />
    </footer>
  )
}
