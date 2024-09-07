import '@fontsource-variable/inter'
import '@fontsource-variable/chivo-mono'
import '@/assets/tailwind.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

createApp(App).use(autoAnimatePlugin).mount('#app')
