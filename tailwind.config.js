/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        ft: '15px'
      },
      colors: {
        softblue: {
          500: '#96cbfd',
          600: '#7db9e8'
        },
        softblack: '#303030',
        cardgray: '#f4f4f5',
        inputgray: '#78747c'
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        lexend: ['"Lexend"', 'sans-serif']
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
