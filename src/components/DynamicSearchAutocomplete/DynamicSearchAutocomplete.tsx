import React, {
	KeyboardEvent,
	ReactNode,
	Ref,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import SearchIcon from './icons/search.svg'
import CloseIcon from './icons/close.svg'
import { classNames } from 'utils/cn'
import { useInputHighlighter } from './hooks/useInputHighlighter'
import { AutoCompleteEntity } from 'stories/DynamicSearchAutocomplete.stories'
import ControlledInput from './ControlledInput'

export interface Item {
	type: AutoCompleteEntity
	id: string
	name: string
	icon?: () => ReactNode
	[key: string]: any // For additional properties
}

interface DynamicSearchAutoCompleteProps<T extends Item> {
	query: string
	value: T[]
	items: T[]
	defaultItemRenderer?: ({
		item,
		query
	}: {
		item: Item
		query?: string
	}) => ReactNode
	itemRendererByType?: Record<
		AutoCompleteEntity,
		({ item }: { item: Item }) => ReactNode
	>
	iconRendererByType?: Record<AutoCompleteEntity, () => ReactNode>
	titleRenderer?: ({ title }: { title: string }) => ReactNode
	onChange?: (value: T[]) => void
	onClear?: VoidFunction
	onClearValue?: VoidFunction
	onQuery?: (input: string) => void
	key?: string
	label?: string
	placeholder?: string
	popupClassName?: string
	maxItems: number
	autoFocus?: boolean
	allowClearAll: boolean
	allowCoordinates: boolean
	highlightNameSearchMatch: boolean
	loading?: boolean
	animateLoading?: boolean
}
export const escapeRegExp = (text: string): string =>
	text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const highlightQueryInText = (text: string, boldText?: string) => {
	if (!boldText) {
		return text
	}
	const parts = text.split(new RegExp(`(${escapeRegExp(boldText)})`, 'gi'))
	return (
		<span>
			{parts.map((part: string, i) =>
				part.toLowerCase() === boldText.toLowerCase() ? (
					<b key={i}>{part}</b>
				) : (
					part
				)
			)}
		</span>
	)
}
const itemRenderer = ({ item, query }: { item: Item; query?: string }) => (
	<div>{highlightQueryInText(item.name, query)}</div>
)
const titleRenderer = ({ title }: { title: string }) => <div>{title}</div>

const shouldDisplayTitles = (items: Item[], i: number) => {
	// Display titles if it's the first item or if the current item's type is different from the previous item's type
	return i === 0 || items[i].type !== items[i - 1].type
}

const selectionKeyEvents = ['Tab', 'Enter']
function DynamicSearchAutoComplete<T extends Item>({
	value,
	query,
	items,
	defaultItemRenderer = itemRenderer,
	itemRendererByType,
	iconRendererByType,
	titleRenderer: TitleRenderer = titleRenderer,
	onClear,
	onClearValue,
	onChange,
	placeholder,
	onQuery,
	key = 'id',
	label = 'name',
	popupClassName = '',
	autoFocus = false,
	maxItems,
	allowCoordinates,
	loading,
	animateLoading
}: DynamicSearchAutoCompleteProps<T>): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		highlightedIndex,
		handleKeyDown: handleKeyDownExtension,
		highlighter
	} = useInputHighlighter(items)
	const onFocusCB = useCallback(() => {
		setIsFocused(true)
		if (value && value.length) {
			inputRef.current?.setSelectionRange(0, query.length)
		}
	}, [query.length, value])
	const [isFocused, setIsFocused] = useState(false)
	const showPopup = items.length > 0 && isFocused && query.length > 1

	const popupRef = useRef<HTMLDivElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const q = `${event.target.value}`
		onQuery?.(q)
	}

	useEffect(() => {
		// This rule will not work when having multiple items, we'll need to clear the query upon selection
		if (value && value.length) {
			inputRef.current?.setSelectionRange(query.length, query.length)
		}
	}, [query.length, value])

	const selectHighlightedItem = useCallback(
		(item?: any) => {
			if (highlightedIndex >= 0 && onChange) {
				onChange(item ? [item] : [items[highlightedIndex]])
			}
		},
		[highlightedIndex, items, onChange]
	)

	const selectHighlightedItemWrapper = useCallback(
		(item: Item) => {
			return () => selectHighlightedItem(item)
		},
		[selectHighlightedItem]
	)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			console.log(event)
			if (event.ctrlKey || event.metaKey) {
				return
			}
			if (event.key === 'Backspace' || event.key.match(/^[\d\w ]$/i)) {
				onClearValue?.()
			}
			if (showPopup) {
				handleKeyDownExtension(event)

				switch (event.key) {
					case 'Tab':
					case 'Enter':
						selectHighlightedItem()

						break
					case 'Backspace':
						onClearValue?.()
						break
					default:
						break
				}
			}
		},
		[handleKeyDownExtension, onClearValue, selectHighlightedItem, showPopup]
	)

	const onClearCB = useCallback(() => {
		onClear?.()
		inputRef.current?.focus()
	}, [onClear])
	const Node = iconRendererByType?.[value?.[0]?.type] ?? null
	return (
		<div>
			<div
				className={classNames('relative flex rounded border bg-white', {
					'rounded-b-none': showPopup
				})}
			>
				{Node ? (
					<Node />
				) : (
					<img
						src={SearchIcon}
						className="scale-50"
						alt="Search Icon"
					/>
				)}

				<ControlledInput
					spellCheck={false}
					ref={inputRef}
					autoFocus={autoFocus}
					value={query}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={onFocusCB}
					onBlur={() => setIsFocused(false)}
					className="h-6 w-full bg-transparent text-xs outline-none placeholder:italic"
					placeholder={placeholder}
				/>
				{query.length > 0 && (
					<button
						tabIndex={-1}
						onClick={onClearCB}
						className="absolute right-0 h-full scale-50"
					>
						<img src={CloseIcon} className="" alt="Close Icon" />
					</button>
				)}
			</div>
			{showPopup && (
				<div
					className={classNames(
						'w-full border rounded rounded-t-none border-t-0 flex flex-col py-2 px-2 select-none',
						popupClassName
					)}
					ref={popupRef}
				>
					{items.map((item, i) => {
						const ItemRenderer =
							itemRendererByType?.[item.type] ??
							defaultItemRenderer
						return (
							<div key={item[key]}>
								{shouldDisplayTitles(items, i) && (
									<div
										className={classNames(
											'text-xs font-bold uppercase',
											{ 'mt-3': i > 0 }
										)}
									>
										<TitleRenderer title={item.type} />
									</div>
								)}

								<button
									onMouseDown={selectHighlightedItemWrapper(
										item
									)}
									tabIndex={-1}
									onMouseOver={() => highlighter.setIndex(i)}
									className={classNames(
										'rounded-3xl px-2 py-0.5 text-xs w-full text-left active:opacity-75',
										{
											'bg-[#E5F0FF]':
												highlightedIndex === i
										}
									)}
								>
									<ItemRenderer item={item} query={query} />
								</button>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default DynamicSearchAutoComplete
