// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // This will be extended in each Next.js project
  ],
  theme: {
    extend: {
      screen: {},
    },
  },
  plugins: [],
};
export default config
