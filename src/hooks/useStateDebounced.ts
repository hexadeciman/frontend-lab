import { useCallback, useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

function useDebounced<T>(
	initialValue: T,
	delay: number
): [T, (value: T) => void] {
	const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
	const subject = useRef(new Subject<T>())

	useEffect(() => {
		const subscription = subject.current
			.pipe(debounceTime(delay))
			.subscribe((newValue) => {
				setDebouncedValue(newValue)
			})

		return () => subscription.unsubscribe()
	}, [delay, subject])

	const setValueDebounced = useCallback(
		(newValue: T) => {
			subject.current.next(newValue)
		},
		[subject]
	)

	useEffect(() => {
		setValueDebounced(initialValue)
	}, [initialValue, setValueDebounced])

	return [debouncedValue, setValueDebounced]
}

export default useDebounced
