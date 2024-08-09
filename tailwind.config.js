/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        serif: ['Your-Old-British-Font', 'serif'],
      },
      colors: {
        "primary-orange": "#FF5722",
      },
      backgroundImage: {
        'violet-blue': 'linear-gradient(to right, #8a2be2, #0000ff)',
      },
    },
  },
  plugins: [],
};
