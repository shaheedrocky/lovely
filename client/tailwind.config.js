/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Primary Romance / Rose / Berry
        primary: {
          50: '#FFF1F5',
          100: '#FFE4EC',
          200: '#FFC9D9',
          300: '#FF9FBA',
          400: '#FF6F95',
          500: '#FF477E',
          600: '#F52F68',
          700: '#D91F54',
          800: '#B51D48',
          900: '#961D41',
          950: '#4C0519',
        },

        // Secondary / Romantic Violet & Lavender
        secondary: {
          50: '#F7F3FF',
          100: '#EEE6FF',
          200: '#DDCEFF',
          300: '#C3A8FF',
          400: '#A77BFF',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },

        // Romance Accents
        accent: {
          pink: '#FF477E',
          purple: '#8B5CF6',
          rose: '#FB7185',
          coral: '#FF6B6B',
          peach: '#FDBA74',
          peachLight: '#FFF0EB',
          amber: '#F59E0B',
          gold: '#FBBF24',
          mint: '#2DD4BF',
        },

        // Backgrounds & Surfaces
        background: {
          light: '#FFFFFF',
          soft: '#FFF7F9',
          secondary: '#F8FAFC',
          dark: '#0F0E17',
          'dark-soft': '#181528',
          'dark-secondary': '#161424',
        },

        surface: {
          light: '#FFFFFF',
          soft: '#FFF7F9',
          elevated: '#FFF9FB',
          dark: '#1E1A33',
          'dark-elevated': '#282344',
        },

        card: {
          light: '#FFFFFF',
          border: '#FDE4ED',
          dark: '#1F1B35',
          'dark-border': '#352E59',
        },

        // Typography
        text: {
          primary: '#1E1B22',
          secondary: '#52525B',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
          brand: '#D91F54',
          'primary-dark': '#F8FAFC',
          'secondary-dark': '#CBD5E1',
          'muted-dark': '#94A3B8',
          'brand-dark': '#FF6F95',
        },

        // Border & Dividers
        border: {
          light: '#F0E4EB',
          subtle: '#F7EFF3',
          dark: '#2E284D',
          'dark-subtle': '#24203D',
        },

        // Status & Dating Actions
        status: {
          online: '#10B981',
          offline: '#94A3B8',
          match: '#EC4899',
          superlike: '#0EA5E9',
          like: '#FF477E',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        tangerine: ['Tangerine-Regular', 'cursive'],
        'tangerine-bold': ['Tangerine-Bold', 'cursive'],
      },
    },
  },

  plugins: [],
};