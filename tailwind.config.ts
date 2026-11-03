import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#04331e',
            light: '#0f5937',
            dark: '#022113',
            surface: '#0a4d2e',
          },
          gold: {
            DEFAULT: '#c9982e',
            light: '#e8c96d',
            hover: '#d5a940',
            dark: '#a87c1a',
          },
          cream: {
            DEFAULT: '#faf9f6',
            surface: '#f3f1eb',
            muted: '#e8e4d9',
          },
          border: '#ddd9cf',
          dark: {
            DEFAULT: '#1a1f1c',
            muted: '#596259',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
