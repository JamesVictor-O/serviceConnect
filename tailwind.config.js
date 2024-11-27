/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        jost:["Jost", "sans-serif"]
      }
    },
  },
  plugins: [],
}

