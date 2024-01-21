import {createPinia} from "pinia"
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { MotionPlugin } from '@vueuse/motion'

loadFonts()
createApp(App).use(router).use(MotionPlugin).use(vuetify).use(createPinia())
  .mount('#app')
