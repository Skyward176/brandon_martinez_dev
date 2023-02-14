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

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['ant-design-vue/dist/antd.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    //plugins: ['@/plugins/antd-ui'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxt/content',
        'nuxt-icon',
        'nuxt-windicss'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
})
