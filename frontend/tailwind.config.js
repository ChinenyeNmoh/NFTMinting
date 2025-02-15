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
		  sans: ["Poppins", "sans-serif"],
		  inter: ["Inter", "sans-serif"], 
		},
		colors: {
		  background: "var(--background)",
		  foreground: "var(--foreground)",
		},
		backgroundImage: {
		  gradient1: "linear-gradient(90deg, #000000 0%, #111827 100%)",
		  gradient2: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
		},
	  },
	},
	plugins: [],
  };
  