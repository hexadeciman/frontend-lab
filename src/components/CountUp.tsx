import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStateDebounced from 'hooks/useStateDebounced'

export const CountUp = ({ value: _ }: { value: number }) => {
	const [countupValueOrig, setCountUpOrig] = useState('0')
	const [countupValue] = useStateDebounced(countupValueOrig, 100)
	const splitValue = useMemo(() => countupValue.split(''), [countupValue])
	console.log(splitValue)
	return (
		<div className="m-2 h-[800px] w-[800px] overflow-hidden rounded-xl border border-slate-200 p-8">
			<div className="relative flex h-[750px] items-center justify-center">
				{splitValue.map((el, i) => (
					<AnimatePresence key={i} mode="wait">
						<motion.div
							key={el}
							initial={{
								y: '20px',
								opacity: 1
							}}
							animate={{
								y: '0px',
								scale: 1,
								opacity: 1,
								filter: `blur(0px)`,
								position: 'relative'
							}}
							exit={{
								y: '-60px',
								opacity: 0,
								display: 'none'
							}}
							transition={{
								ease: 'easeInOut',
								duration: 0.1
							}}
							className="inline w-20 text-center text-8xl font-bold "
						>
							{el}
						</motion.div>
					</AnimatePresence>
				))}
			</div>
			<input
				type="range"
				min="0"
				max="1000"
				value={countupValueOrig}
				onChange={(e) => {
					setCountUpOrig(e.target.value)
				}}
				className="slider"
				id="myRange"
			/>
		</div>
	)
}
