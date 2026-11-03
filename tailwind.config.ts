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
            DEFAULT: '#d9a721',
            light: '#f4d375',
            hover: '#e5b83b',
            dark: '#b28514',
          },
          cream: {
            DEFAULT: '#fcfbf7',
            surface: '#f5f3ec',
            muted: '#ede9de',
          },
          dark: {
            DEFAULT: '#19241e',
            muted: '#445148',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
