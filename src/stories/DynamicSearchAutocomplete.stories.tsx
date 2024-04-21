import type { Meta, StoryObj } from '@storybook/react'
import DynamicSearchAutocomplete, {
	Item
} from 'components/DynamicSearchAutocomplete/DynamicSearchAutocomplete'
import { useArgs } from '@storybook/preview-api'
import { TitleRenderer as titleRenderer } from 'components/DynamicSearchAutocomplete/renderers/TitleRenderer'
import { PortRenderer } from 'components/DynamicSearchAutocomplete/renderers/PortRenderer'
import { VesselRenderer } from 'components/DynamicSearchAutocomplete/renderers/VesselRenderer'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'DynamicSearch/AutoComplete',
	component: DynamicSearchAutocomplete,
	argTypes: {
		query: {
			type: 'string',
			value: ''
		}
	}
} satisfies Meta<typeof DynamicSearchAutocomplete>

export default meta
export enum AutoCompleteEntity {
	Vessel = 'Vessel',
	Port = 'Port'
}

const itemRendererByType = {
	[AutoCompleteEntity.Vessel]: VesselRenderer,
	[AutoCompleteEntity.Port]: PortRenderer
}
const iconRendererByType = {
	[AutoCompleteEntity.Vessel]: () => <h1>Vessel:</h1>,
	[AutoCompleteEntity.Port]: () => <h1>Port:</h1>
}
type VesselEntity = {
	type: AutoCompleteEntity
	name: string
	id: string
	imo: number
}
const defaultItems = [
	{
		type: AutoCompleteEntity.Vessel,
		id: 'sdfsdfs',
		name: 'Elandra',
		imo: 1298391
	},
	{
		type: AutoCompleteEntity.Vessel,
		id: 'sdfsdfgfdfs',
		name: 'Panamos',
		imo: 1298391
	},
	{
		type: AutoCompleteEntity.Port,
		id: 'dfsdgsd',
		name: 'Fos'
	}
]
const Template = {
	render: function Component(args: any) {
		const [, setArgs] = useArgs()

		const onClear = () => {
			setArgs({ query: '', value: undefined })
		}
		const onClearValue = () => {
			setArgs({ value: undefined })
		}
		const onQuery = (q: string) => {
			setArgs({
				query: q,
				items: defaultItems
			})
		}
		const onChange = (items: Item[]) => {
			// change value in Controls table
			setArgs({ query: items[0].name, value: items, items: [] })
		}

		return (
			<DynamicSearchAutocomplete<VesselEntity>
				{...args}
				titleRenderer={titleRenderer}
				itemRendererByType={itemRendererByType}
				iconRendererByType={iconRendererByType}
				onClear={onClear}
				onClearValue={onClearValue}
				onQuery={onQuery}
				onChange={onChange}
			/>
		)
	},
	args: {
		// if you need general args add them here
	}
}

type Story = StoryObj<typeof meta>
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultInput: Story = {
	...Template,
	args: {
		query: 'Pal',
		placeholder: 'Find Ports, Locations, Coordinates, Vessel Location',
		value: [],
		items: [],
		maxItems: 1,
		allowClearAll: true,
		allowCoordinates: true,
		highlightNameSearchMatch: true
	}
}

export const WithResults: Story = {
	...Template,
	args: {
		query: 'Ela',
		placeholder: 'Find Ports, Locations, Coordinates, Vessel Location',
		value: [],
		items: defaultItems,
		autoFocus: true,
		maxItems: 1,
		allowClearAll: true,
		allowCoordinates: true,
		highlightNameSearchMatch: true
	}
}
