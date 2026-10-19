import { ArrowRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PrimaryCta({
  href,
  children,
  icon = 'arrow',
  className,
}: {
  href: string
  children: React.ReactNode
  icon?: 'arrow' | 'whatsapp'
  className?: string
}) {
  const external = /^https?:\/\//.test(href)
  const Icon = icon === 'whatsapp' ? MessageCircle : ArrowRight
  return (
    <a
      href={href}
      className={cn('btn-fire', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="min-w-0 break-words">{children}</span>
      <Icon aria-hidden size={18} className="shrink-0" />
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  )
}
