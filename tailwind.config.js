/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "glow-primary": "hsl(var(--glow-primary))",
        "glow-secondary": "hsl(var(--glow-secondary))",
      },
      transitionTimingFunction: {
        // Aprobado por el usuario: easing suave y premium
        'cinematic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
        sans: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
