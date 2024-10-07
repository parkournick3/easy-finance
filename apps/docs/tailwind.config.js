/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
