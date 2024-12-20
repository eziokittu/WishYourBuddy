/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mybg-basic": "#0f172a",
        "mybg-light": "#1e293b",
        "mybg-dark": "#020617",
        "mybtn-green-basic": "#16a34a",
        "mybtn-green-light": "#bbf7d0",
        "mybtn-green-dark": "#166534",
        "mybtn-red-basic": "#dc2626",
        "mybtn-red-light": "#fecaca",
        "mybtn-red-dark": "#991b1b",
        "mybtn-gray-basic": "#6b7280",
        "mybtn-gray-light": "#e5e7eb",
        "mybtn-gray-dark": "#374151",
      },
      screens: {
        '2xsm': '300px',
        'xsm': '430px',
        'sm': '675px',
        'md': '810px',
        'lg': '1024px',
        'xl': '1325px',
        '2xl': '1600px',
      },
      fontFamily: {
        // 'RubikDoodleShadow': ['Rubik Doodle Shadow', 'sans-serif'],
        'JainiPurva': ["Jaini Purva", "system-ui"],
        'Jaldi': ["Jaldi", "sans-serif"]
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}