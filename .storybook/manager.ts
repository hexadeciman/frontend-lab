import { addons } from '@storybook/manager-api'
import labTheme from './labTheme'

addons.setConfig({
	theme: labTheme,
	navSize: 300,
	bottomPanelHeight: 300,
	rightPanelWidth: 300,
	showToolbar: false, // Hide the toolbar
	showPanel: false, // Hide the addons panel
	panelPosition: 'bottom',
	enableShortcuts: true,
	selectedPanel: undefined,
	initialActive: false,
	sidebar: {
		showRoots: false,
		collapsedRoots: ['other']
	},
	toolbar: {
		title: { hidden: true },
		zoom: { hidden: true },
		eject: { hidden: true },
		copy: { hidden: true },
		fullscreen: { hidden: true },
		'storybook/background': { hidden: true },
		'storybook/viewport': { hidden: true }
	}
})
addons.register('custom-panel', (api) => {
	api.togglePanel(false)
})
