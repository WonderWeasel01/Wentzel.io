/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        brand: {
          blue: 'hsl(195, 100%, 46%)',
        },
        pill: {
          DEFAULT: 'var(--pill)',
          foreground: 'var(--pill-foreground)',
        },
        muted: {
          foreground: 'var(--muted-foreground)',
        },
      },
      transitionTimingFunction: {
        'menu-expand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'menu-width': '360ms',
        'menu-height': '280ms',
      },
      keyframes: {
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        pillHover: {
          '0%': { filter: 'blur(0px)' },
          '35%': { filter: 'blur(5px)' },
          '60%': { filter: 'blur(7px)' },
          '100%': { filter: 'blur(0px)' },
        },
        shurikenHover: {
          '0%': { transform: 'rotate(0deg)', filter: 'blur(0px)' },
          '30%': { transform: 'rotate(160deg)', filter: 'blur(4px)' },
          '55%': { transform: 'rotate(300deg)', filter: 'blur(7px)' },
          '75%': { transform: 'rotate(360deg)', filter: 'blur(2px)' },
          '100%': { transform: 'rotate(360deg)', filter: 'blur(0px)' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 24s linear infinite',
        'pill-hover': 'pillHover 0.65s ease-in-out both',
        'shuriken-hover': 'shurikenHover 0.7s ease-in-out both',
        scroll: 'scroll 40s linear infinite',
      },
    },
  },
  plugins: [],
}
