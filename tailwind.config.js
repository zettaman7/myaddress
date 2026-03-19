/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1D4ED8',
        'primary-light': '#EFF6FF',
        'primary-border': '#BFDBFE',
        success: '#059669',
        'success-light': '#D1FAE5',
        'success-bg': '#F0FDF4',
        warning: '#D97706',
        'warning-light': '#FEF3C7',
        'warning-bg': '#FFFBEB',
        danger: '#EF4444',
        navy: '#1E3A5F',
        'navy-light': '#93C5FD',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'map-isometric': "url('/map-bg.jpg')",
      },
    },
  },
  plugins: [],
}
