export default defineNuxtConfig({
  modules: ["@nuxt/ui"],

  devtools: {
    enabled: false,
  },

  ssr: true,

  components: {
    dirs: [
      { path: "~/components", pathPrefix: false },
      { path: "~/components/Stepper", pathPrefix: false },
    ],
  },

  css: ["~/assets/css/main.css"],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",

    head: {
      title: "Captura AI",
      titleTemplate: "Captura AI",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Choose a style, upload a photo, and let AI generate a smart commercial description.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:site_name", content: "Captura AI" },
        { property: "og:locale", content: "nl_NL" },
        { name: "twitter:site", content: "@" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "apple-touch-icon.png",
        },
        { rel: "manifest", href: "site.webmanifest" },
      ],
    },
  },

  compatibilityDate: "2025-01-15",
});
