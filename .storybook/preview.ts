import type { Preview } from '@storybook/vue3'
import '@fontsource-variable/inter'
import '@fontsource-variable/chivo-mono'
import '@/assets/tailwind.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
