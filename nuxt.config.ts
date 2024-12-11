// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    public: {
    
    }
  },

  modules: [
    '@nuxtjs/tailwindcss', '@pinia/nuxt'
  ],

  pinia: {
    autoImports: [
      'defineStore',
    ],
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'viewport-fit=cover, width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' }
      ]
    }
  },

  css: [
    "@/assets/css/main.css",
  ],

  imports: {
    dirs: ['stores']
  },

  compatibilityDate: '2024-12-10'
});