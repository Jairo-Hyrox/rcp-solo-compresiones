import { Hud } from '@/components/Hud'
import { GameProvider } from '@/components/game/GameProvider'
import { Footer, FaqSection, FinalCtaSection, OfferSection } from '@/components/sections/Conversion'
import { ProcessSection, SolutionSection, TransparencySection } from '@/components/sections/Course'
import { HeroSection } from '@/components/sections/Hero'
import { NarrativeSection, PreparationSection, RevelationSection } from '@/components/sections/Story'
import { PROCESS } from '@/data/copy'

export default function Home() {
  return (
    <GameProvider stepCount={PROCESS.steps.length}>
      <Hud />
      <main>
        <HeroSection />
        <NarrativeSection />
        <PreparationSection />
        <RevelationSection />
        <SolutionSection />
        <ProcessSection />
        <TransparencySection />
        <OfferSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </GameProvider>
  )
}
