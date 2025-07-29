/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1a1a1a',
          950: '#0a0a0a',
        }
      },
      spacing: {
        '18': '4.5rem',
        '27': '6.75rem',
      }
    },
  },
  plugins: [],
};