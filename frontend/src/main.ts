import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// pinia
import { createPinia } from "pinia"


// markdowneditor
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import ruRU from '@kangc/v-md-editor/lib/lang/ru-RU'

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
  Prism,
});
VMdEditor.lang.use('ru-RU', ruRU)

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
  .use(
    Vue3Toasity,
    {
      autoClose: 3000,
      "theme": "dark",
      "type": "default",
      "dangerouslyHTMLString": true
    } as ToastContainerOptions,
  )
  .use(vuetify)
  .use(router)
  .use(VMdEditor)
  .use(pinia)
  .mount('#app')





