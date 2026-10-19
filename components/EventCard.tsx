'use client'

import { CalendarDays, CalendarPlus, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EVENT } from '@/data/event'
import { EVENT_UI } from '@/data/gamification'
import { cn } from '@/lib/utils'

// 13:00 de Panamá (UTC-5) = 18:00 UTC. DTSTAMP fijo para que el archivo sea estable.
const ICS = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Innova Training//RCP Solo Compresiones//ES',
  'BEGIN:VEVENT',
  'UID:rcp-solo-compresiones-20261205@innovatraining',
  'DTSTAMP:20261018T000000Z',
  'DTSTART:20261205T180000Z',
  'DTEND:20261205T200000Z',
  `SUMMARY:${EVENT.title}`,
  `DESCRIPTION:${EVENT_UI.calendarDescription}`,
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

const ICS_HREF = `data:text/calendar;charset=utf-8,${encodeURIComponent(ICS)}`

export function EventCard({ className }: { className?: string }) {
  const [local, setLocal] = useState<string | null>(null)

  // Hora en la zona del visitante (solo si es distinta a la de Panamá). Se calcula tras montar para evitar diferencias con el servidor.
  useEffect(() => {
    try {
      const date = new Date(EVENT.startsAt)
      const base = { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false } as const
      const mine = new Intl.DateTimeFormat('es', base).format(date)
      const panama = new Intl.DateTimeFormat('es', { ...base, timeZone: 'America/Panama' }).format(date)
      if (mine !== panama) {
        setLocal(
          new Intl.DateTimeFormat('es', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZoneName: 'short',
          }).format(date),
        )
      }
    } catch {
      /* sin soporte de Intl: se muestra solo la hora de Panamá */
    }
  }, [])

  return (
    <div className={cn('card-game p-4 sm:p-5', className)}>
      <p className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-amber">
        <Video aria-hidden size={14} />
        {EVENT_UI.label}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-fire-gradient text-ink">
            <CalendarDays aria-hidden size={24} />
          </span>
          <div className="min-w-0">
            <p className="break-words text-lg font-black leading-tight text-fg sm:text-xl">{EVENT.dateLabel}</p>
            <p className="mt-0.5 text-base font-bold text-amber">
              {EVENT.timeLabel} <span className="font-semibold text-soft">· {EVENT.zoneLabel}</span>
            </p>
          </div>
        </div>
        <a href={ICS_HREF} download="rcp-solo-compresiones.ics" className="btn-ghost">
          <CalendarPlus aria-hidden size={16} />
          {EVENT_UI.addToCalendar}
        </a>
      </div>
      {local && (
        <p className="mt-3 text-sm text-mute">
          {EVENT_UI.localTime} <span className="font-semibold text-soft">{local}</span>
        </p>
      )}
    </div>
  )
}
