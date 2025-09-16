import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public as any)?.siteUrl || 'http://localhost:3000'
  const base = siteUrl.replace(/\/$/, '')

  const urls = [
    { loc: `${base}/`, changefreq: 'weekly', priority: 1.0 },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
  urls.map(u => `\n  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('') +
  `\n</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
})
