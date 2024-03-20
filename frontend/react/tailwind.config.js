/** @type {import('tailwindcss').Config} */
let modExports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}



// using material-tailwind; see https://www.material-tailwind.com/docs/react/installation
const withMT = require("@material-tailwind/react/utils/withMT");
modExports = withMT(modExports)


module.exports = modExports