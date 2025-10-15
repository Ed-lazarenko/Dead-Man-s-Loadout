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
          DEFAULT: '#00e7f8',
          hover: '#00c2d4',
          dark: '#0e2225',
        },
        secondary: {
          DEFAULT: '#5eff9c',
          hover: '#3ddf7e',
        },
        accent: {
          DEFAULT: '#00f7ff',
          hover: '#00d4e6',
        },
        danger: {
          DEFAULT: '#ff4e4e',
          hover: '#e23c3c',
        },
        warning: '#ffae00',
        success: '#00ff68',
        team: {
          1: '#f4d9ad',
          2: '#a0ff7a',
          3: '#ffdd57',
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00e7f8' },
          '100%': { boxShadow: '0 0 20px #00e7f8, 0 0 30px #00e7f8' },
        }
      }
    },
  },
  plugins: [],
}