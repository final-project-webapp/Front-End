export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MediaRE',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@sweetalert2/theme-dark'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'vue-sweetalert2/nuxt/no-css'
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
  },

  toast: {
    position: 'top-center',
    duration : 2000,
    fullWidth : false,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
},

  
  proxy: {
    "/movies": "http://localhost:3000"
  },

  env: {
    baseUrl: process.env.BACK_URL
  },

//     modules: [
//       '@nuxtjs/axios',
//       '@nuxtjs/proxy'
      
//   ],
// proxy: {
//   '/movies': {
//     target: 'http://localhost:3000',
//     pathRewrite: {
//       '^/movies' : '/'
//       }
//     }
// },
  
 

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: { compact: true }    
  },

  server: {
    port: 8000 // default: 3000
  },

  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
}
