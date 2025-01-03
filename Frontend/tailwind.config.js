/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src folder
    "./src/components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src/components folder
    "./src/Factory-Components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src/components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
