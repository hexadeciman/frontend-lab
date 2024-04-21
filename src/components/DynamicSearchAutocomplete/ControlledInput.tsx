import {
	ChangeEventHandler,
	FocusEventHandler,
	HTMLProps,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react'

const ControlledInput = forwardRef(
	(props: HTMLProps<HTMLInputElement>, forwardRef) => {
		const { value, onChange, onBlur, ...rest } = props
		const valueLen = `${value}`.length
		const [cursor, setCursor] = useState<number>(valueLen)
		const inputRef = useRef<HTMLInputElement>(null)
		useImperativeHandle(forwardRef, () => inputRef.current)

		useEffect(() => {
			inputRef.current?.setSelectionRange(cursor, cursor)
		}, [inputRef, cursor, value])

		const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
			setCursor(e.target.selectionStart as number)
			onChange && onChange(e)
		}
		const onBlurCB: FocusEventHandler<HTMLInputElement> = useCallback(
			(e) => {
				setCursor(valueLen)
				onBlur?.(e)
			},
			[onBlur, valueLen]
		)

		return (
			<input
				ref={inputRef}
				value={value}
				onChange={handleChange}
				onBlur={onBlurCB}
				{...rest}
			/>
		)
	}
)
ControlledInput.displayName = 'ControlledInput'
export default ControlledInput
