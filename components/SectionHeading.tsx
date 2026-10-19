import { cn } from '@/lib/utils'
import { LevelChip } from './game/LevelSection'
import { Reveal } from './game/Reveal'

/** Encabezado de sección con chip de nivel y titular. */
export function SectionHeading({
  level,
  id,
  children,
  align = 'left',
  className,
}: {
  level: number
  id: string
  children: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Reveal>
        <LevelChip level={level} />
      </Reveal>
      <Reveal as="h2" id={id} delay={80} className="mt-5 break-words text-3xl font-black leading-[1.08] tracking-[-0.025em] sm:text-4xl lg:text-5xl">
        {children}
      </Reveal>
    </div>
  )
}
