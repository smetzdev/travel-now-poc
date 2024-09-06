/** @type {import('tailwindcss').Config} */
import tailwindColors from 'tailwindcss/colors'
import tailwindPluginForms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: tailwindColors.sky,
        gray: tailwindColors.gray
      }
    }
  },
  plugins: [tailwindPluginForms]
}
