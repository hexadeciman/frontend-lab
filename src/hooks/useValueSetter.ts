import { useState, useEffect } from 'react'

export const useValueSetter = (
	initialValue: number,
	maxValue: number
): string[] => {
	const [value, setValue] = useState<number>(initialValue)
	console.log(initialValue, maxValue)
	useEffect(() => {
		const interval = setInterval(() => {
			if (value < maxValue) {
				setValue((prevValue) => prevValue + 1)
			}
		}, 240)

		return () => clearInterval(interval)
	}, [value, maxValue])

	return value.toString().split('')
}
