/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Safelist dynamic theme colors
    {
      pattern: /bg-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /via-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /to-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /ring-(romantic|gold|gray|emerald|green|teal|cyan|blue|orange|amber|yellow|purple|fuchsia|violet|rose|pink|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
