import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RCP Solo Compresiones | Formación online',
  description:
    'Formación online de RCP Solo Compresiones con práctica interactiva por Zoom. Sábado 5 de diciembre de 2026, 13:00 (hora de Panamá).',
  metadataBase: new URL('https://rcp-solo-compresiones.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    siteName: 'Innova Training',
    url: '/',
    title: 'RCP Solo Compresiones | Formación online',
    description: 'Formación online por Zoom. Sábado 5 de diciembre de 2026, 13:00 (hora de Panamá).',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'RCP Solo Compresiones — Innova Training' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCP Solo Compresiones | Formación online',
    description: 'Formación online por Zoom. Sábado 5 de diciembre de 2026, 13:00 (hora de Panamá).',
    images: ['/og-image.jpg'],
  },
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Activa las animaciones de aparición solo si hay JavaScript; sin JS todo el contenido queda visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
