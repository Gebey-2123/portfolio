import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deep: '#070d1a',
        surface: '#0c1324',
        'surface-low': '#151b2d',
        'surface-mid': '#191f31',
        'surface-high': '#23293c',
        'surface-top': '#2e3447',
        'on-surface': '#dce1fb',
        'on-muted': '#bcc9cd',
        outline: '#3d494c',
        cyan: '#00e5ff',
        'cyan-dim': '#00b8cc',
        'cyan-dark': '#003640',
        violet: '#a855f7',
        'violet-mid': '#7e22ce',
        amber: '#ffb873',
        'amber-dark': '#4b2800',
        danger: '#ff4d6d',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
