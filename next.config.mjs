/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Página de oferta (HTML estático en public/oferta.html), accesible en /oferta
  async rewrites() {
    return [{ source: '/oferta', destination: '/oferta.html' }]
  },
}

export default nextConfig
