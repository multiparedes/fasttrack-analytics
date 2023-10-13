// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  components: ['@/components/'],  
  css: ['@/main.css'],
  plugins: ['@/plugins/fontawesome.js'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: '/fasttrack-analytics/',
    buildAssetsDir: 'assets',
    head: {
      link:  [{ rel: 'shortcut icon', type: 'image/x-icon', href: '@/assets/favicon.svg' }],
      title: 'A Formula 1 interactive dashboard'
    }
  },
})
