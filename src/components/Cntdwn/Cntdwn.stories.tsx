import type { Meta, StoryObj } from '@storybook/react'
import { RadarStats } from 'components/RadarStats/RadarStats'
import { Cntdwn } from './Cntdwn'

const meta = {
	title: 'Experiments/Cntdwn',
	component: Cntdwn,
	parameters: {
		previewTabs: {
			'storybook/docs/panel': { hidden: true }
		},
		viewMode: 'canvas'
	},
	argTypes: {}
} satisfies Meta<typeof RadarStats>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {},
	parameters: {
		backgrounds: { default: 'white' }
	}
}
