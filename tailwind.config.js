/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          base: '#FFF9F0',
          deep: '#FFF1DC',
        },
        brand: {
          pink: '#FF9EC4',
          raspberry: '#E85C96',
          cocoa: '#5C3A4E',
          gold: '#FFC94D',
        },
        category: {
          math: '#FFE8A3',
          'math-dark': '#E6C870',
          memory: '#E3D4F0',
          'memory-dark': '#B89FD4',
          nature: '#B8E8D4',
          'nature-dark': '#7CC7A7',
          social: '#BFE3F5',
          'social-dark': '#83C2E6',
        }
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
        numeric: ['Fredoka', 'sans-serif'],
      },
      boxShadow: {
        'felt-button': '0 4px 0 0 rgba(92, 58, 78, 0.25)',
        'felt-card': '0 6px 0 0 rgba(92, 58, 78, 0.12)',
        'felt-card-hover': '0 10px 0 0 rgba(92, 58, 78, 0.16)',
        'felt-pressed': '0 1px 0 0 rgba(92, 58, 78, 0.25)',
        'felt-badge': '0 3px 0 0 rgba(92, 58, 78, 0.2)',
      },
      borderRadius: {
        'felt-sm': '12px',
        'felt-md': '20px',
        'felt-lg': '28px',
        'felt-xl': '36px',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'wiggle-gentle': 'wiggle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}

