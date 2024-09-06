/** @type {import('tailwindcss').Config} */
import tailwindColors from 'tailwindcss/colors'

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
  plugins: []
}
