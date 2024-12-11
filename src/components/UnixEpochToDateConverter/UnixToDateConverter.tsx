import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

function isValidDate(d?: Date) {
	return d instanceof Date && !isNaN(d as any)
}
function dateFromDaysSinceYearOne(days: number): Date {
	const resultDate = new Date(days * 24 * 60 * 60 * 1000)
	return resultDate
}

function daysSinceYearOne(date: Date): number {
	const startDate = new Date(0) // January 1, 1970
	const diffTime = date.getTime() - startDate.getTime()
	return Math.floor(diffTime / (24 * 60 * 60 * 1000))
}
const Toast: React.FC<{
	message: string
	onClose: () => void
	visible: boolean
}> = ({ message, visible }) => {
	return (
		<div
			className={`fixed bottom-4 right-4 rounded-md bg-gray-800 px-4 py-2 text-white shadow-lg transition-opacity duration-300 ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			{message}
		</div>
	)
}
// Input Component
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => {
	return (
		<input
			{...props}
			className="rounded-md border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	)
}

// Button Component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
	forwardRef((props, ref: any) => {
		return (
			<button
				ref={ref}
				{...props}
				className="rounded-md bg-blue-500 px-2 py-1 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
			>
				{props.children}
			</button>
		)
	})
Button.displayName = 'Button'
export const UnixToDateConverter = () => {
	const [epochVal, setEpochVal] = useState(19967)
	const [date, setDate] = useState<Date | null>(
		dateFromDaysSinceYearOne(epochVal)
	)
	const [showToast, setShowToast] = useState(false)
	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false)
			}, 3000)

			// Cleanup function to clear the timeout if the component unmounts or showToast changes
			return () => clearTimeout(timer)
		}
	}, [showToast])
	const copyDateToClipboard = useCallback(() => {
		if (date) {
			const formattedDate = `${date
				.getDate()
				.toString()
				.padStart(2, '0')}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, '0')}-${date.getFullYear()}`
			navigator.clipboard.writeText(formattedDate)
			setShowToast(true)
		}
	}, [date])

	const onDaysChangeCB = useCallback((event: any) => {
		if (event.target.value) {
			const value = parseInt(event.target.value)
			setEpochVal(event.target.value)
			const newDate = dateFromDaysSinceYearOne(value)
			console.log(newDate)
			if (isValidDate(newDate)) {
				setDate(newDate)
			} else {
				setDate(null)
			}
		} else {
			setEpochVal(0)
			setDate(dateFromDaysSinceYearOne(0))
		}
	}, [])

	const onDateChange = useCallback((event: any) => {
		const value = event.target.value // string format YYYY-MM-DD
		const newDate = new Date(value)
		setDate(newDate)
		setEpochVal(daysSinceYearOne(newDate))
	}, [])

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex h-auto w-auto flex-col gap-y-6 rounded-lg bg-[#131313] p-8">
				<div className="flex flex-col gap-y-1">
					<h3 className="pointer-events-none text-left font-bold text-gray-100">
						Unix EPOCH
					</h3>
					<Input
						type="number"
						onFocus={(e) => e.target.select()}
						className="px-2"
						value={epochVal}
						onChange={onDaysChangeCB}
						placeholder="19967"
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<h3 className="pointer-events-none text-left font-bold text-gray-100">
						Date
					</h3>
					<div className="flex gap-x-2">
						<Input
							className=" px-3"
							type="date"
							id="start"
							name="trip-start"
							onChange={onDateChange}
							value={date?.toISOString().split('T')[0]}
						/>
						<Button
							title="Copy date to clipboard"
							className="rounded-md border border-gray-400 px-2"
							onClick={copyDateToClipboard}
						>
							<ClipboardDocumentIcon className="w-[16px] text-white" />
						</Button>
						<Toast
							message="Copied to clipboard!"
							onClose={() => setShowToast(false)}
							visible={showToast}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
