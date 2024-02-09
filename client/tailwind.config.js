/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'custom': ['Dancing Script', 'cursive'],
  },
  },
  plugins: [require("daisyui")],
}
