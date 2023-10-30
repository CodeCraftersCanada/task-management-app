/** @type {import('tailwindcss').Config} */
//"./<custom-folder>/**/*.{js,jsx,ts,tsx}",
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./src/features/authentication/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-yellow": "#FED36A",
				"primary-gray": "#8CAAB9",
				"primary-cyan": "#455A64",
			},
		},
	},
	plugins: [],
};
