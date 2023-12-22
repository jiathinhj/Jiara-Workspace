const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			primary: '#8CBDCA',
			secondary: '#F3B975',
			background: '#D9E9ED',
		},
		fontFamily: {
			sans: ["Open Sans", "sans-serif"],
		},
		extend: {
		},
	},
	plugins: [],
})
