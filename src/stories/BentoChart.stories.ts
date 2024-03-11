import type { Meta, StoryObj } from '@storybook/react'
import { BentoChart } from '../components/BentoChart'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Experiments/BentoChart',
	component: BentoChart,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered'
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		data: Array.from(
			{ length: 7 },
			() => Math.floor(Math.random() * 100) + 1
		)
	}
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof BentoChart>

export default meta

type Story = StoryObj<typeof meta>
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		data: Array.from(
			{ length: 7 },
			() => Math.floor(Math.random() * 100) + 1
		)
	}
}
/*
export const Secondary: Story = {
	args: {
		label: 'Button'
	}
}

export const Large: Story = {
	args: {
		size: 'large',
		label: 'Button'
	}
}

export const Small: Story = {
	args: {
		size: 'small',
		label: 'Button'
	}
}

export const Warning: Story = {
	args: {
		primary: true,
		label: 'Delete now',
		backgroundColor: 'red'
	}
}
*/
