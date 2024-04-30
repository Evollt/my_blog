import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// pinia
import { createPinia } from "pinia"

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount('#app')





