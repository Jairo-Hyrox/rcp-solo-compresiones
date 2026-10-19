import { SECTION_IDS } from '@/config/site'
import { ACES_LOGO } from '@/data/documents'

/** Logo de ACES en la parte principal; lleva a "Respaldo y pruebas". */
export function AcesBadge() {
  return (
    <a
      href={`#${SECTION_IDS.respaldo}`}
      aria-label="ACES: ver respaldo y pruebas"
      className="mt-6 inline-flex items-center rounded-2xl border border-line bg-panel/70 px-4 py-3 transition hover:border-fire/70"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ACES_LOGO.src} alt="" width={ACES_LOGO.width} height={ACES_LOGO.height} className="h-9 w-auto" />
    </a>
  )
}

/** Logo de ACES dentro del bloque "Documentación de respaldo"; abre el sitio oficial. */
export function AcesInline() {
  return (
    <a
      href={ACES_LOGO.website}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center rounded-xl border border-line bg-ink/60 px-4 py-3 transition hover:border-fire/70"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ACES_LOGO.src} alt={ACES_LOGO.alt} width={ACES_LOGO.width} height={ACES_LOGO.height} className="h-10 w-auto" />
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}

/** Logo discreto para el pie de página. */
export function AcesFooterMark() {
  return (
    <a href={ACES_LOGO.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ACES_LOGO.src} alt={ACES_LOGO.alt} width={ACES_LOGO.width} height={ACES_LOGO.height} className="h-9 w-auto opacity-90" />
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}
