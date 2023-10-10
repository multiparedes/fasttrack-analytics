// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  components: ['@/components/'],  
  modules: ['@nuxtjs/color-mode'],
  css: ['@/main.css'],
  plugins: ['@/plugins/fontawesome.js'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
