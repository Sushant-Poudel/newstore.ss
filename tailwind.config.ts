import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fafaf8',
          100: '#f4f2ed',
          200: '#e8e4dc',
          300: '#d4cfc4',
          400: '#a8a39a',
          500: '#807b72',
          600: '#5e5a53',
          700: '#3d3a35',
          800: '#252320',
          900: '#111110',
          950: '#080807',
        },
        gold: {
          50:  '#fdf9f0',
          100: '#f7edcc',
          200: '#edd9a0',
          300: '#e0c070',
          400: '#cfa84a',
          500: '#b8913a',
          600: '#9a7830',
          700: '#7d6026',
          800: '#5f481c',
          900: '#3d2e11',
        },
        cream: {
          50:  '#fdfcf9',
          100: '#f8f5ef',
          200: '#eeeadf',
          300: '#e2ddd4',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        'ultra': '0.3em',
      },
    },
  },
  plugins: [],
}

export default config
