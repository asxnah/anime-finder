/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#09090B',       /* Основной фон */
          surface: '#181722',  /* Фон инпутов и карточек */
          border: '#272536',   /* Границы */
        },
        primary: {
          DEFAULT: '#A78BFA',
          hover: '#8B5CF6',
        },
        text: {
          main: '#FFFFFF',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
