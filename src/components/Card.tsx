import { ReactNode } from 'react'

interface OwnProps {
	children?: ReactNode
	title: string
	emoji: string
	description: string
}
export const Card = ({ title, emoji, description, children }: OwnProps) => {
	return (
		<div className="h-[345px] w-[500px] overflow-hidden rounded-xl border border-slate-200 p-8">
			<div title={description}>
				{emoji} {title}
			</div>
			{children}
		</div>
	)
}
