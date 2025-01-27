import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'glow-green': 'glow-green 1.5s ease-in-out infinite',
        'glow-purple': 'glow-purple 1.5s ease-in-out infinite',
        'pulse-fast': 'pulse-fast 1.2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'crt-flicker': 'crt-flicker 0.15s infinite',
        'noise': 'noise 0.2s steps(5) infinite',
        'static': 'static 1s steps(4) infinite',
        'blink': 'blink 1s steps(2) infinite',
        'screen-shake': 'screen-shake 0.4s ease-in-out',
        'glitch-click': 'glitch-click 0.3s steps(3)',
        'distort': 'distort 0.2s ease-in-out',
      },
      keyframes: {
        'glow-green': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00',
            textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00'
          },
          '50%': { 
            boxShadow: '0 0 15px #00ff00, 0 0 25px #00ff00, 0 0 35px #00ff00',
            textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00'
          },
        },
        'glow-purple': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
            textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff'
          },
          '50%': { 
            boxShadow: '0 0 15px #ff00ff, 0 0 25px #ff00ff, 0 0 35px #ff00ff',
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff'
          },
        },
        'pulse-fast': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-2px, -2px)', filter: 'hue-rotate(-90deg)' },
          '60%': { transform: 'translate(2px, 2px)', filter: 'hue-rotate(90deg)' },
          '80%': { transform: 'translate(2px, -2px)', filter: 'hue-rotate(-90deg)' },
        },
        'crt-flicker': {
          '0%': { opacity: '0.9' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.9' },
        },
        'noise': {
          '0%, 100%': { backgroundPosition: '0 0' },
          '20%': { backgroundPosition: '20% -20%' },
          '40%': { backgroundPosition: '-20% 20%' },
          '60%': { backgroundPosition: '20% 20%' },
          '80%': { backgroundPosition: '-20% -20%' },
        },
        'static': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-1px)' },
          '50%': { transform: 'translateX(1px)' },
          '75%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(2px)' },
        },
        'blink': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff00' },
        },
        'screen-shake': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        'glitch-click': {
          '0%': { 
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg) saturate(100%)'
          },
          '33%': { 
            transform: 'translate(-5px, 2px)',
            filter: 'hue-rotate(90deg) saturate(200%)'
          },
          '66%': { 
            transform: 'translate(5px, -2px)',
            filter: 'hue-rotate(-90deg) saturate(200%)'
          },
          '100%': { 
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg) saturate(100%)'
          },
        },
        'distort': {
          '0%': { transform: 'skew(0deg, 0deg)' },
          '25%': { transform: 'skew(-2deg, 1deg)' },
          '75%': { transform: 'skew(2deg, -1deg)' },
          '100%': { transform: 'skew(0deg, 0deg)' },
        },
      },
      dropShadow: {
        'glow-green': '0 0 10px rgba(0, 255, 0, 0.5)',
        'glow-purple': '0 0 10px rgba(255, 0, 255, 0.5)',
      },
      backgroundImage: {
        'noise-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVfJ92AAAACHRSTlMABQgNERQHGxzQ0eYAAACSSURBVDjLhZExDoQwDARzgF+kpKKi5v9vw4Jkx2Zl0Y2EwjDrYcmxTeMQ82VhO8V5QpytKQxDyqKKFCF2VUoRgl1VSRFCXVVREcJcVVkRQltVRRGCrarQIMxV1RBCs6qEEPqqUoTQVpUihLaqFCG0VaUIoa0qRQhFVSlCaKtKEUJbVYoQ2qpShNBWlSKEtqoUIbRVfS5NCr9ynHe4AAAAAElFTkSuQmCC')",
      },
    },
  },
  plugins: [],
};

export default config;
