// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/seo"],

  devtools: {
    enabled: false,
  },

  typescript: {
    shim: false,
  },

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://pfrommer1982.github.io/Captura-AI/',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      defaultTitle: 'Captura AI',
      defaultDescription: 'Choose a style, upload a photo, and let AI generate a smart commercial description.'
    }
  },

  components: {
    dirs: [
      { path: "~/components", pathPrefix: false },
      { path: "~/components/Stepper", pathPrefix: false }
    ]
  },

  css: ["~/assets/css/main.css"],

  // Alles vooraf prerenderen
  routeRules: {
    "/": { prerender: true },
    "/privacy": { prerender: true },
    "/terms": { prerender: true },
    "/how-it-works": { prerender: true }
  },

  nitro: {
    preset: 'github-pages', // belangrijk voor GitHub Pages
    prerender: {
      // Avoid crawling unexpected links (e.g. from SEO/OG modules)
      crawlLinks: false,
      routes: ["/", "/privacy", "/terms", "/how-it-works"],
      // Don't fail the build if a route errors during generation
      failOnError: false
    }
  },

  app: {
    // *** GitHub Pages base URL ***
    baseURL: '/Captura-AI/',

    head: {
      title: "Captura AI",
      titleTemplate: "Captura AI",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Choose a style, upload a photo, and let AI generate a smart commercial description." },
        { name: "robots", content: "index, follow" },
        { property: "og:site_name", content: "Captura AI" },
        { property: "og:locale", content: "nl_NL" },
        { name: "twitter:site", content: "@" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "apple-touch-icon.png" },
        { rel: "manifest", href: "site.webmanifest" }
      ]
    },
  },

  // Disable sourcemaps to avoid Tailwind Vite plugin sourcemap warnings
  vite: {
    css: { devSourcemap: false },
    build: { sourcemap: false }
  },

  // Also ensure Nuxt doesn't emit client/server sourcemaps
  sourcemap: { client: false, server: false },

  // Site config: prefer trailing slashes for GitHub Pages static hosting and set absolute site URL
  site: { url: 'https://pfrommer1982.github.io/Captura-AI/', trailingSlash: true },

  // Disable robots.txt generation (baseURL is a subpath on GitHub Pages)
  robots: { robotsTxt: false },

  // Disable sitemap XSL to prevent /__sitemap__/style.xsl prerender errors with baseURL
  sitemap: { xsl: false },

  // Nuxt Link Checker: ignore uppercase in URLs due to repo base path
  linkChecker: {
    skipInspections: ['no-uppercase-chars'],
    runOnBuild: true,
    failOnError: false,
    showLiveInspections: true
  },

  compatibilityDate: "2025-01-15",
});
