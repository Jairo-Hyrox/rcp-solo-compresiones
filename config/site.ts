// Configuración central del sitio.
export const SITE_NAME = "RCP Solo Compresiones"

// Enlace oficial de WhatsApp de Innova Training (+507 6330-7958).
// Si lo dejas vacío, los CTA llevan a las preguntas frecuentes en lugar de un enlace inventado.
export const WHATSAPP_URL = "https://wa.me/50763307958"

export const PRICE_LABEL = "$35 USD"

// Anclas internas de navegación
export const SECTION_IDS = {
  formacion: "la-formacion",
  comoFunciona: "como-funciona",
  respaldo: "respaldo-y-pruebas",
  oferta: "oferta",
  faq: "preguntas-frecuentes",
} as const

// Destino de los botones de contacto: WhatsApp si está configurado; si no, las preguntas frecuentes.
export const CONTACT_HREF = WHATSAPP_URL || `#${SECTION_IDS.faq}`
