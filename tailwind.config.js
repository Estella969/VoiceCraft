/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          soft: '#C4B5FD'
        },
        accent: {
          DEFAULT: '#38BDF8',
          soft: '#BAE6FD'
        },
        surface: {
          100: '#1E1B4B',
          200: '#2E287B'
        }
      },
      animation: {
        'fadeDown': 'fadeDown 400ms ease-out',
        'float': 'float 3s ease-in-out infinite',
        'marquee': 'marquee 15s linear infinite',
      },
      keyframes: {
        fadeDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      fontSize: {
        'fluid-lg': 'clamp(1rem, 2.5vw, 1.25rem)'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
};
