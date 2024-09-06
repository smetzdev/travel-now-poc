/** @type {import('tailwindcss').Config} */
import tailwindColors from 'tailwindcss/colors'
import tailwindDefaults from 'tailwindcss/defaultTheme'
import tailwindPluginForms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: tailwindColors.sky,
        gray: tailwindColors.gray
      }
    },

    fontFamily: {
      mono: ['Chivo Mono Variable', ...tailwindDefaults.fontFamily.mono],
      sans: ['Inter Variable', ...tailwindDefaults.fontFamily.sans]
    }
  },
  plugins: [tailwindPluginForms]
}
