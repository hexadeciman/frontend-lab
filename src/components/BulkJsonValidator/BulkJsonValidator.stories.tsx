import type { Meta, StoryObj } from '@storybook/react'
import BulkJsonValidator from './BulkJsonValidator'

const meta = {
	title: 'Experiments/BulkJsonValidator',
	component: BulkJsonValidator,
	parameters: {
		previewTabs: {
			'storybook/docs/panel': { hidden: true }
		},
		viewMode: 'canvas'
	},
	argTypes: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {},
	parameters: {
		backgrounds: { default: 'white' }
	}
}
