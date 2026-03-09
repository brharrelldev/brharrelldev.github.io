export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  content: {
    highlight: {
      theme: 'one-dark-pro',
      langs: ['zig', 'go', 'bash', 'json', 'typescript', 'python', 'c', 'cpp'],
    },
  },
  app: {
    head: {
      title: 'mod_blog',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500&display=swap',
        },
      ],
    },
  },
  compatibilityDate: '2025-01-01',
})
