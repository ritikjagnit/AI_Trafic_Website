/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#0a0e17',
          card: '#111827',
          cardBorder: '#1f293d',
          header: '#0d1322',
          sidebar: '#080c14',
          hover: '#1a2436',
          accent: '#3b82f6',
        },
        traffic: {
          low: '#10b981',
          moderate: '#f59e0b',
          high: '#f97316',
          critical: '#ef4444',
          blue: '#3b82f6',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-emerald': '0 0 15px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 15px rgba(245, 158, 11, 0.35)',
        'glow-rose': '0 0 20px rgba(239, 68, 68, 0.45)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' },
          '50%': { opacity: 0.5, filter: 'drop-shadow(0 0 2px rgba(239, 68, 68, 0.3))' },
        },
        radarScan: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.5s infinite ease-in-out',
        'radar-scan': 'radarScan 4s linear infinite',
      }
    },
  },
  plugins: [],
}
