/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#070B0F',
          900: '#0D1117',
          800: '#161B22',
          700: '#21262D',
          600: '#30363D',
          500: '#484F58',
        },
        accent: {
          orange: '#F5A623',
          'orange-dark': '#D4891A',
          'orange-light': '#FFB84D',
          blue: '#58A6FF',
          'blue-dark': '#1F6FEB',
          'blue-light': '#79C0FF',
        },
        text: {
          primary: '#E6EDF3',
          secondary: '#C9D1D9',
          muted: '#8B949E',
          faint: '#6E7681',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
        hero: ['Recursive', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(245,166,35,0.35), 0 0 40px rgba(245,166,35,0.1)',
        'glow-blue': '0 0 20px rgba(88,166,255,0.35), 0 0 40px rgba(88,166,255,0.1)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
