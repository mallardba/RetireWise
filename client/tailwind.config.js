/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5BFF',
          dark: '#1E40AF',
          light: '#60A5FA'
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5'
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
