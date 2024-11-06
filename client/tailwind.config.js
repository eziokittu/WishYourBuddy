/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colours: {
        "myGreen1": "green-400",
        "myGreen2": "green-600",
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