/** @type {import('tailwindcss').Config} */
import {
  black as _black,
  white as _white,
  gray as _gray,
  yellow as _yellow,
  purple as _purple,
} from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
export const content = ["./public/**/*.html", "./src/**/*.vue"];
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: _black,
        white: _white,
        gray: _gray,
        yellow: _yellow,
        purple: _purple,
      },
    },
  },
  plugins: [],
};
