export default defineNuxtConfig({
    typescript: {
        strict: true,
    },
    app: {
        head: {
            title: 'Brandon Martinez',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { hid: 'description', name: 'description', content: '' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
    // Global page headers: https://go.nuxtjs.dev/config-head

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    //plugins: ['@/plugins/antd-ui'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxt/content',
        'nuxt-icon',
    ],
    // https://v3.nuxtjs.org/api/configuration/nuxt.config
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
})
