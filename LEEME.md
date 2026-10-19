# RCP Solo Compresiones — Sales Page gamificada (Innova Training)

Next.js 16 · React 19 · Tailwind 4 · TypeScript. Se ve igual en celular y computador, sin scroll horizontal.

## Cómo correrla

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # verificación de producción
```

## Cómo publicarla (sin gastar créditos de V0)

1. Sube esta carpeta a un repositorio privado de GitHub.
2. En Vercel: **Add New → Project → Import** ese repositorio. Cada cambio que subas se publica solo.

## Dónde cambiar cada cosa

| Qué | Archivo |
|---|---|
| Enlace de WhatsApp, precio, nombre | `config/site.ts` |
| Fecha y hora del curso (5 dic 2026, 13:00 Panamá) | `data/event.ts` |
| Colores de marca | `app/globals.css` (bloque `@theme`) |
| Copy de la Copywriter (literal) | `data/copy.ts`, `data/faq.ts`, `data/features.ts` |
| Textos nuevos del juego, XP y calendario | `data/gamification.ts` |
| Logo de ACES (arriba, en "Respaldo y pruebas" y en el pie) | `data/documents.ts` (`ACES_LOGO`) y `public/aces-logo.png`; solo se muestra el logo, sin fechas ni vigencias |
| Documentos verificables del certificado | `data/documents.ts` (`VERIFIED_DOCUMENTS`, vacío: no se muestra nada) |
| Logo y foto del encabezado | `public/innova-logo.png`, `public/rcp-hero.jpg` |

## Paleta de marca (tomada del logo y del flyer)

- Fondo: `#0B0B0C`
- Naranja principal: `#F26F1A`
- Rojo-naranja del logo: `#ED320D`
- Ámbar: `#F4A51E`
- Amarillo del flyer: `#FBC608`
- Rojo "RCP" del flyer: `#FE0000`

## Qué hace la parte gamificada

- Barra superior con XP y nivel (suma al ir recorriendo la página) y barra de progreso de scroll.
- Cada sección es un "nivel" (1 al 10), en el mismo orden de la Copywriter.
- Los 5 pasos de "Cómo funciona" siempre están visibles; marcarlos como revisados es opcional.
- Mini juego "Practica el ritmo" dentro del nivel 4.
- Tarjeta de la sesión con tu hora local y botón para agregar al calendario.

Nada de esto bloquea contenido, simula pagos ni crea urgencia. Con "reducir movimiento" activado en el dispositivo, las animaciones se apagan.

## Texto nuevo que NO viene del documento de la Copywriter

Todo vive en `data/gamification.ts` y `data/event.ts` (fácil de editar o quitar): etiquetas de nivel y XP, textos del mini juego (incluido el rango de referencia de 100 a 120 compresiones por minuto), fecha y hora de la sesión, "Agregar al calendario" y "Marcar como revisado".

## Pendientes

- Nombre completo de la entidad: la página muestra solo el logo "ACES". Si quieres el nombre escrito, confirma cuál usar (el flyer dice "Asociación para la Capacitación en Emergencias y Socorros"; el diploma, "Asociación Internacional de Instructores ACES").
- El certificado de instructor no está publicado en la página. Si algún día lo agregas, usa uno vigente en `data/documents.ts`.
- Mensaje precargado de WhatsApp (opcional): se agrega al final del enlace como `?text=...`.
