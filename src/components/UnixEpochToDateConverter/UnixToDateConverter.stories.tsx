import type { Meta, StoryObj } from '@storybook/react'
import { UnixToDateConverter } from 'components/UnixEpochToDateConverter/UnixToDateConverter'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Converters/UnixToDateConverter',
	component: UnixToDateConverter,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered'
	},
	argTypes: {
		epochVal: {
			control: 'number',
			defaultValue: 19967
		}
	}
} satisfies Meta<typeof UnixToDateConverter>

export default meta

type Story = StoryObj<typeof meta>
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		epochVal: 19967
	},
	parameters: {
		backgrounds: { default: 'black' } // Use 'dark' background
	}
}
