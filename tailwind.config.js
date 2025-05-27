/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--primary-50) / <alpha-value>)',
          100: 'hsl(var(--primary-100) / <alpha-value>)',
          200: 'hsl(var(--primary-200) / <alpha-value>)',
          300: 'hsl(var(--primary-300) / <alpha-value>)',
          400: 'hsl(var(--primary-400) / <alpha-value>)',
          500: 'hsl(var(--primary-500) / <alpha-value>)',
          600: 'hsl(var(--primary-600) / <alpha-value>)',
          700: 'hsl(var(--primary-700) / <alpha-value>)',
          800: 'hsl(var(--primary-800) / <alpha-value>)',
          900: 'hsl(var(--primary-900) / <alpha-value>)',
          950: 'hsl(var(--primary-950) / <alpha-value>)',
        },
        accent: {
          50: 'hsl(var(--accent-50) / <alpha-value>)',
          100: 'hsl(var(--accent-100) / <alpha-value>)',
          200: 'hsl(var(--accent-200) / <alpha-value>)',
          300: 'hsl(var(--accent-300) / <alpha-value>)',
          400: 'hsl(var(--accent-400) / <alpha-value>)',
          500: 'hsl(var(--accent-500) / <alpha-value>)',
          600: 'hsl(var(--accent-600) / <alpha-value>)',
          700: 'hsl(var(--accent-700) / <alpha-value>)',
          800: 'hsl(var(--accent-800) / <alpha-value>)',
          900: 'hsl(var(--accent-900) / <alpha-value>)',
          950: 'hsl(var(--accent-950) / <alpha-value>)',
        },
        success: {
          50: 'hsl(var(--success-50) / <alpha-value>)',
          100: 'hsl(var(--success-100) / <alpha-value>)',
          500: 'hsl(var(--success-500) / <alpha-value>)',
          900: 'hsl(var(--success-900) / <alpha-value>)',
        },
        warning: {
          50: 'hsl(var(--warning-50) / <alpha-value>)',
          100: 'hsl(var(--warning-100) / <alpha-value>)',
          500: 'hsl(var(--warning-500) / <alpha-value>)',
          900: 'hsl(var(--warning-900) / <alpha-value>)',
        },
        error: {
          50: 'hsl(var(--error-50) / <alpha-value>)',
          100: 'hsl(var(--error-100) / <alpha-value>)',
          500: 'hsl(var(--error-500) / <alpha-value>)',
          900: 'hsl(var(--error-900) / <alpha-value>)',
        },
        neutral: {
          50: 'hsl(var(--neutral-50) / <alpha-value>)',
          100: 'hsl(var(--neutral-100) / <alpha-value>)',
          200: 'hsl(var(--neutral-200) / <alpha-value>)',
          300: 'hsl(var(--neutral-300) / <alpha-value>)',
          400: 'hsl(var(--neutral-400) / <alpha-value>)',
          500: 'hsl(var(--neutral-500) / <alpha-value>)',
          600: 'hsl(var(--neutral-600) / <alpha-value>)',
          700: 'hsl(var(--neutral-700) / <alpha-value>)',
          800: 'hsl(var(--neutral-800) / <alpha-value>)',
          900: 'hsl(var(--neutral-900) / <alpha-value>)',
          950: 'hsl(var(--neutral-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
};