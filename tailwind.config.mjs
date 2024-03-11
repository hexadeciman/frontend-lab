/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				fadein: {
					'0%': { opacity: 0 },
					'100%': { transform: 1 }
				}
			},
			animation: {
				fadein: 'fadein .3s ease-in-out forwards'
			}
		}
	},
	plugins: []
}
