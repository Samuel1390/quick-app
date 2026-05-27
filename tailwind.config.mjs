import { join } from "path"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
