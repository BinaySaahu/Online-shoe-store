/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      oswald:"Oswald, sans-serif",
      urbanist:"Urbanist, sans-serif"
    },
    boxShadow:{
      card: "box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
    },
    extend: {},
  },
  plugins: [],
}

// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;