/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          yellow: '#ffff00',
          green: '#00ff88',
          red: '#ff0044',
          orange: '#ff8800',
          dark: '#050510',
          panel: '#0a0a1a',
          border: '#1a1a3e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glitch': 'glitch 0.4s steps(2) infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px #00ffff, 0 0 40px #00ffff44',
        'neon-magenta': '0 0 20px #ff00ff, 0 0 40px #ff00ff44',
        'neon-yellow': '0 0 20px #ffff00, 0 0 40px #ffff0044',
      },
    },
  },
  plugins: [],
}
