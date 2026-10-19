import Image from 'next/image'
import { SECTION_IDS } from '@/config/site'
import { HERO } from '@/data/copy'
import { AcesBadge } from '../AcesCredential'
import { EventCard } from '../EventCard'
import { LevelChip, LevelSection } from '../game/LevelSection'
import { Reveal } from '../game/Reveal'
import { PrimaryCta } from '../PrimaryCta'

// El titular se parte solo para colorear el nombre; el texto visible es exactamente HERO.title.
const BRAND = 'RCP Solo Compresiones'
const [titleBefore, titleAfter] = HERO.title.split(BRAND)

export function HeroSection() {
  return (
    <LevelSection id="top" level={1} labelledBy="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -right-32 -top-40 size-[38rem] rounded-full bg-fire/25 blur-[130px]" />
      <div aria-hidden className="absolute -left-40 bottom-0 size-[26rem] rounded-full bg-ember/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:py-14 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <Reveal>
            <LevelChip level={1} />
          </Reveal>
          <Reveal as="p" delay={60} className="mt-6 max-w-xl text-lg font-semibold leading-8 text-amber">
            {HERO.lead}
          </Reveal>
          <Reveal as="h1" delay={120} id="hero-title" className="mt-5 break-words text-[2.5rem] font-black leading-[1.02] tracking-[-0.035em] sm:text-6xl xl:text-[4.25rem]">
            {titleBefore}
            <span className="text-fire-gradient">{BRAND}</span>
            {titleAfter}
          </Reveal>
          <Reveal delay={180} className="mt-6 max-w-xl space-y-3 text-lg leading-8 text-soft">
            {HERO.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </Reveal>

          <Reveal delay={240} className="mt-6 max-w-2xl">
            <EventCard />
          </Reveal>

          <Reveal delay={300} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="text-2xl font-black tracking-tight text-fg sm:text-3xl">{HERO.price}</p>
            <PrimaryCta href={`#${SECTION_IDS.oferta}`}>{HERO.cta}</PrimaryCta>
          </Reveal>
          <Reveal as="p" delay={340} className="mt-4 max-w-md text-sm leading-6 text-mute">
            {HERO.microcopy}
          </Reveal>
          <Reveal delay={380}>
            <AcesBadge />
          </Reveal>
        </div>

        {/* Imagen de marca: practicante en formación */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute inset-8 rounded-full bg-fire/30 blur-3xl" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fire/50 animate-[pulse-ring_3.2s_ease-out_infinite]"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-fire/30 shadow-[0_30px_80px_-30px_rgb(242_111_26/0.7)]">
            <Image
              src="/rcp-hero.jpg"
              alt=""
              width={590}
              height={1192}
              priority
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div aria-hidden className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <svg aria-hidden viewBox="0 0 480 80" className="absolute inset-x-0 bottom-5 w-full px-4">
              <defs>
                <linearGradient id="ecg-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="#ED320D" />
                  <stop offset=".5" stopColor="#F26F1A" />
                  <stop offset="1" stopColor="#F4A51E" />
                </linearGradient>
              </defs>
              <polyline
                points="0,40 90,40 110,40 125,8 145,72 165,24 180,40 300,40 320,40 335,8 355,72 375,24 390,40 480,40"
                fill="none"
                stroke="url(#ecg-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="240 240"
                style={{ animation: 'ecg 3.2s linear infinite' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </LevelSection>
  )
}
