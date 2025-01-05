import { createContext, useContext } from 'react'
import { classNames } from 'utils'

// size = "header" | "subtitle" | "text"
// theme = "normal" | "muted" | "text" | "l" | "xl" | "custom"
export const Text = ({
	size = 'm',
	theme = 'normal',
	fallback = '',
	bold = false,
	className,
	children,
	...rest
}: any) => {
	return (
		<span
			className={classNames(
				'inline-block leading-6',
				{
					// sizes:
					'text-4xl lg:text-[40px] font-bold leading-8':
						size === 'header',
					'text-xl font-bold': size === 'subtitle',
					'text-base font-bold': size === 'text',
					'text-sm': size === 'small',
					'font-bold': bold,

					// colors:
					'text-neutral-900': theme === 'normal',
					'text-[#949494]': theme === 'muted',
					'text-slate-100': theme === 'contrast'
				},
				className
			)}
			{...rest}
		>
			{children ?? fallback}
		</span>
	)
}

export const EditingTextContext = createContext(false)
export const EditableText = ({
	fallback,
	textClassName,
	children,
	editComponent: EditComponent,
	...editComponentProps
}: any) => {
	const isEditing = useContext(EditingTextContext)
	return isEditing ? (
		<EditComponent {...editComponentProps} />
	) : (
		<Text
			fallback={fallback}
			title={children ?? fallback}
			className={classNames(textClassName, 'truncate')}
		>
			{children}
		</Text>
	)
}
