import { ReactNode } from 'react'

interface OwnProps {
	children: ReactNode
}
export const Card = ({ children }: OwnProps) => {
	return (
		<div className="h-[345px] w-[500px] overflow-hidden rounded-xl border border-slate-200 p-8">
			{children}
		</div>
	)
}
