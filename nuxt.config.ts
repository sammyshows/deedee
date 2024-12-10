// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
      CODE_ANALYSIS_SERVICE_URL: process.env.CODE_ANALYSIS_SERVICE_URL,
      DOCUMENTATION_SERVICE_URL: process.env.DOCUMENTATION_SERVICE_URL,
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

  compatibilityDate: '2024-12-10'
});