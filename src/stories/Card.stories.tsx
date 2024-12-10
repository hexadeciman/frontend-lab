import type { Meta, StoryObj } from '@storybook/react'
import { ListCard } from 'components/ListCard'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'LifeInTodos/ListCard',
	component: ListCard,
	parameters: {
		title: 'Art',
		emoji: '🎨',
		description:
			"This to do list is about the art project I'd like to pursue",
		autoFocus: false
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		title: {
			type: 'string',
			value: ''
		},
		emoji: {
			type: 'string',
			value: ''
		},
		description: {
			type: 'string',
			value: ''
		},
		autoFocus: {
			type: 'boolean',
			value: false
		}
	}
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof ListCard>

export default meta

type Story = StoryObj<typeof meta>
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		title: 'Art',
		emoji: '🎨',
		description:
			"This to do list is about the art project I'd like to pursue",
		todos: [
			{
				label: 'Continue working on your 100 posters goal',
				checked: true,
				id: '1'
			},
			{
				label: 'Scan paper art and import in procreate',
				checked: false,
				id: '2'
			},
			{
				label: 'Scan everything',
				checked: true,
				id: '3',
				selected: true
			},
			{
				label: '',
				checked: false,
				id: '4',
				selected: false,
				autoFocus: true
			}
		],
		selected: false
	}
}
