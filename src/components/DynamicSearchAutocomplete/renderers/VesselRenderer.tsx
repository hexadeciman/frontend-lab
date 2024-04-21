import { Item, highlightQueryInText } from '../DynamicSearchAutocomplete'

export const VesselRenderer = ({
	item,
	query
}: {
	item: Item
	query?: string
}) => {
	return (
		<span>
			V: {highlightQueryInText(item.name, query)} - {item.imo}
		</span>
	)
}
