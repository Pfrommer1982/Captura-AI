import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public as any)?.siteUrl || 'http://localhost:3000'

  const content = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return content
})
