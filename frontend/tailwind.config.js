import fluid, { extract } from 'fluid-tailwind'
/** @type {import('tailwindcss').Config} */

import fluid from 'fluid-tailwind';

export default {
  content: {
    files:["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
    extract,
},
  theme: {
    extend: {},
    fontFamily:{
      'dancing-script':["Dancing Script", "cursive"],
      'prata':["Prata", "sans-serif"],
      'ramraja':["Ramaraja", "sans-serif"]

    }
  },
  plugins:[fluid],
}

