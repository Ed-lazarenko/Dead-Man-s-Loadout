/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основная палитра - тематика "Набор мертвеца" (зомби/охотники)
        primary: {
          50: '#fdf4e8',
          100: '#fae6c1',
          200: '#f5cc96',
          300: '#efb068',
          400: '#e8943f',
          500: '#D2691E', // Основной цвет - ржавый оранжевый
          600: '#b8561a',
          700: '#9e4416',
          800: '#843212',
          900: '#6a200e',
          DEFAULT: '#D2691E',
          hover: '#b8561a',
          dark: '#2d1b0a',
        },
        secondary: {
          50: '#f0f8f0',
          100: '#d9efd9',
          200: '#b3dfb3',
          300: '#8dcf8d',
          400: '#67bf67',
          500: '#8FBC8F', // Основной цвет - тусклый зеленый (болотный)
          600: '#729972',
          700: '#557655',
          800: '#385338',
          900: '#1b301b',
          DEFAULT: '#8FBC8F',
          hover: '#729972',
        },
        accent: {
          DEFAULT: '#DC143C', // Кроваво-красный
          hover: '#b0112f',
        },
        danger: {
          DEFAULT: '#8B0000', // Темно-красный (кровь)
          hover: '#660000',
        },
        warning: '#DAA520', // Золотистый (старое золото)
        success: '#228B22', // Лесной зеленый
        // Темная палитра для фонов - земляные тона
        dark: {
          50: '#f7f6f4',
          100: '#efede8',
          200: '#dfdbd1',
          300: '#cfc9ba',
          400: '#bfb7a3',
          500: '#afa58c',
          600: '#8c836f',
          700: '#696152',
          800: '#463f35',
          900: '#231d18',
          950: '#0f0d0a',
        },
        // Дополнительные тематические цвета
        rust: {
          DEFAULT: '#B7410E', // Ржавчина
          light: '#CD853F', // Светлая ржавчина
          dark: '#8B4513', // Темная ржавчина
        },
        bone: {
          DEFAULT: '#F5F5DC', // Кость
          old: '#DDD8C7', // Старая кость
          dark: '#C4B5A0', // Темная кость
        },
        blood: {
          DEFAULT: '#DC143C', // Свежая кровь
          dark: '#8B0000', // Темная кровь
          dried: '#722F37', // Засохшая кровь
        },
        metal: {
          DEFAULT: '#708090', // Металл
          rusted: '#B7410E', // Ржавый металл
          old: '#2F4F4F', // Старый металл
        },
        // Цвета команд - тематические
        team: {
          1: '#D2691E', // Ржавый оранжевый
          2: '#8FBC8F', // Тусклый зеленый
          3: '#DAA520', // Золотистый
          4: '#DC143C', // Кроваво-красный
          5: '#708090', // Металлический серый
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(210, 105, 30, 0.5)',
        'glow-lg': '0 0 40px rgba(210, 105, 30, 0.6)',
        'glow-xl': '0 0 60px rgba(210, 105, 30, 0.7)',
        'neon': '0 0 5px #D2691E, 0 0 10px #D2691E, 0 0 15px #D2691E',
        'neon-lg': '0 0 10px #D2691E, 0 0 20px #D2691E, 0 0 30px #D2691E',
        'inner-glow': 'inset 0 0 20px rgba(210, 105, 30, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'rust': '0 0 15px rgba(183, 65, 14, 0.4)',
        'blood': '0 0 15px rgba(220, 20, 60, 0.4)',
        'bone': '0 0 10px rgba(245, 245, 220, 0.3)',
        'metal': '0 0 12px rgba(112, 128, 144, 0.4)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rust': 'rust 2s ease-in-out infinite alternate',
        'blood': 'blood 2s ease-in-out infinite alternate',
        'bone': 'bone 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'decay': 'decay 4s ease-in-out infinite',
        'creep': 'creep 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #D2691E' },
          '100%': { boxShadow: '0 0 20px #D2691E, 0 0 30px #D2691E' },
        },
        rust: {
          '0%': { boxShadow: '0 0 5px #B7410E' },
          '100%': { boxShadow: '0 0 15px #B7410E, 0 0 25px #B7410E' },
        },
        blood: {
          '0%': { boxShadow: '0 0 5px #DC143C' },
          '100%': { boxShadow: '0 0 15px #DC143C, 0 0 25px #DC143C' },
        },
        bone: {
          '0%': { boxShadow: '0 0 5px #F5F5DC' },
          '100%': { boxShadow: '0 0 10px #F5F5DC, 0 0 20px #F5F5DC' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        decay: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        creep: {
          '0%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rust': 'rust 3s ease-in-out infinite alternate',
        'blood': 'blood 2.5s ease-in-out infinite alternate',
        'bone': 'bone 4s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'decay': 'decay 4s ease-in-out infinite',
        'creep': 'creep 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rust-grid': 'linear-gradient(rgba(183, 65, 14, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(183, 65, 14, 0.1) 1px, transparent 1px)',
        'bone-pattern': 'radial-gradient(circle at 25% 25%, rgba(245, 245, 220, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245, 245, 220, 0.1) 0%, transparent 50%)',
        'blood-splatter': 'radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      }
    },
  },
  plugins: [],
}