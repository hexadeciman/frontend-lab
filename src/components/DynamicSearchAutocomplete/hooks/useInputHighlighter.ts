import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'

const defaultHighlightedIndex = 0
export const useInputHighlighter = (items: any[]) => {
	const [highlightedIndex, setHighlightedIndex] = useState(
		defaultHighlightedIndex
	)

	useEffect(() => {
		setHighlightedIndex(defaultHighlightedIndex)
	}, [items])

	const highlighter = useMemo(
		() => ({
			next: () =>
				setHighlightedIndex((prevIndex) =>
					prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex
				),
			prev: () =>
				setHighlightedIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : defaultHighlightedIndex
				),
			setIndex: (i: number) => setHighlightedIndex(i),
			clear: () => setHighlightedIndex(defaultHighlightedIndex)
		}),
		[items.length]
	)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'ArrowUp') {
				highlighter.prev()
				event.preventDefault()
			} else if (event.key === 'ArrowDown') {
				highlighter.next()
				event.preventDefault()
			}
		},
		[highlighter]
	)

	return { highlightedIndex, highlighter, handleKeyDown }
}
