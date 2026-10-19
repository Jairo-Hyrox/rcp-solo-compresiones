// Zona preparada para documentos verificables (certificado, entidad emisora, etc.).
// Agrega aquí SOLO documentos reales, con su título y su enlace.
export interface VerifiedDocument {
  id: string
  title: string
  href: string
}

export const VERIFIED_DOCUMENTS: VerifiedDocument[] = []

// Logo de ACES (tomado del certificado de instructor) y su sitio oficial, impreso en ese mismo documento.
// Solo se muestra el logo: la página no afirma fechas ni vigencias.
export const ACES_LOGO = {
  src: "/aces-logo.png",
  alt: "ACES",
  width: 408,
  height: 256,
  website: "https://www.acesint.org",
} as const
