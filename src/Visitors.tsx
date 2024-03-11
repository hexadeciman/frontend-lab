import AnimatedNumber from 'components/AnimatedNumber'
import { BentoChart } from 'components/BentoChart'
import { Card } from 'components/Card'

export const Visitors = () => {
	return (
		<Card>
			<div className="flex flex-col gap-5">
				<div>
					<h4 className="text-xs font-bold text-slate-500">
						UNIQUE VISITORS
					</h4>
				</div>
				<div>
					<h1 className="animate-fadein text-5xl font-bold">
						<AnimatedNumber value={17375} />
					</h1>
					<h1 className="text-lg">03 - 10 Nov 2023</h1>
				</div>
				<div className="grow self-baseline justify-self-end">
					<BentoChart
						data={Array.from(
							{ length: 7 },
							() => Math.floor(Math.random() * 100) + 1
						)}
					/>
				</div>
			</div>
		</Card>
	)
}
