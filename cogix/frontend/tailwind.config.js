/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cogix: {
          bg: '#0a0a0a',
          sidebar: '#111111',
          toolbar: '#0f0f0f',
          card: '#1a1a1a',
          hover: '#222222',
          border: '#2a2a2a',
          text: '#f0f0f0',
          muted: '#888888',
          accent: '#a855f7',
          success: '#22c55e',
          danger: '#ef4444',
          info: '#3b82f6',
          memory: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
