import type { Preview } from '@storybook/react'
import 'tailwindcss/tailwind.css'
import 'material-icons/iconfont/material-icons.css'
import '../src/index.scss'
const preview: Preview = {
	parameters: {
		options: {
			showPanel: true
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		layout: 'fullscreen',
		backgrounds: {
			default: 'white',
			values: [
				{ name: 'black', value: '#000000' },
				{ name: 'white', value: '#ffffff' }
				// Add more background options if needed
			]
		}
	}
}

export default preview
