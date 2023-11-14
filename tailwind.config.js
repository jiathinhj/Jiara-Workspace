/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		colors: {
			primary: '#F3B975',
			secondary: '#8CBDCA',
			background: '#F8F2EE',
		},
		fontFamily: {
			logo: ['Pacifico', 'cursive'],
			body: ['Dosis', 'sans-serif'],
			sans: ['Dosis', 'sans-serif'],
		},
		extend: {
		},
	},
	plugins: [],
})
