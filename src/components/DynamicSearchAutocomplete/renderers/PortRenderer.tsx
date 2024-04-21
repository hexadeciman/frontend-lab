import { Item, highlightQueryInText } from '../DynamicSearchAutocomplete'

export const PortRenderer = ({
	item,
	query
}: {
	item: Item
	query: string
}) => {
	return <span>P: {highlightQueryInText(item.name, query)}</span>
}
