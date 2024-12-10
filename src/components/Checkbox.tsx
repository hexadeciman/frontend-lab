import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from 'utils/cn'
import ContentEditable from 'react-contenteditable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface OwnProps
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	label?: string
	selected?: boolean
	id: string
	onCheckedChange?: any
	onDelete?: any
}
const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	OwnProps
>(({ className, label, selected, id, autoFocus, onDelete, ...props }, ref) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const [innerLabel, setLabel] = React.useState(label ?? '')
	const inputRef = React.useRef<any>(null)

	React.useEffect(() => {
		console.log(inputRef.current?.getEl())
		if (autoFocus) {
			inputRef.current?.getEl().focus()
		}
	}, [])
	const onChange = React.useCallback((event: any) => {
		setLabel(event.target.value)
	}, [])
	const onDeleteDetction = React.useCallback(
		(event: any) => {
			if (
				event.code === 'Backspace' &&
				inputRef.current.lastHtml.length === 0
			) {
				onDelete({ id })
			}
		},
		[id, onDelete]
	)
	const style = {
		transform: CSS.Translate.toString(transform),
		transition
	}
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn('flex gap-x-2 px-4 py-1', {
				'bg-slate-100/90': selected
			})}
		>
			<CheckboxPrimitive.Root
				ref={ref}
				className={cn(
					'peer h-4 w-4 shrink-0 rounded-sm border border-primary/50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/10 data-[state=checked]:bg-accent data-[state=checked]:text-primary-foreground',
					className
				)}
				disabled={!innerLabel || innerLabel.length === 0}
				{...props}
				onCheckedChange={(value) =>
					props.onCheckedChange({ id, value })
				}
			>
				<CheckboxPrimitive.Indicator
					className={cn(
						'flex items-center justify-center text-current'
					)}
				>
					<span className="material-icons mt-[-1px] h-4 w-4 !text-xs !font-extrabold">
						check
					</span>
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor="terms1"
					className={cn(
						'text-sm leading-[1.1] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 min-w-[100px]',
						{ 'text-accent/80': props.checked }
					)}
				>
					<ContentEditable
						ref={inputRef}
						aria-placeholder="What's next"
						spellCheck={false}
						className="min-w-full outline-none placeholder:!italic  empty:before:italic empty:before:text-gray-300 empty:before:content-[attr(aria-placeholder)]"
						html={innerLabel ?? ''} // innerHTML of the editable div
						disabled={(props?.checked as boolean) ?? false} // use true to disable editing
						onChange={onChange} // handle innerHTML change
						onKeyDown={onDeleteDetction}
						tagName="article" // Use a custom HTML tag (uses a div by default)
						autoFocus={autoFocus}
					/>
				</label>
			</div>
		</div>
	)
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
