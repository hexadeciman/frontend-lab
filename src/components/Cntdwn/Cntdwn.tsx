import { Fragment, useEffect, useState } from 'react'
import { getUpdatedExchanges } from './exchanges'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { classNames } from 'utils'

const AnimatedTimer = ({ time, className, prefix }: any) => (
	<span className={classNames('font-semibold', className)}>
		<NumberFlowGroup>
			<NumberFlow
				className=""
				value={time.hours}
				format={{ minimumIntegerDigits: 2, useGrouping: false }}
				suffix="h "
				prefix={prefix}
			/>
			<NumberFlow
				format={{ minimumIntegerDigits: 2, useGrouping: false }}
				value={time.minutes}
				suffix="m "
			/>
			<NumberFlow
				format={{ minimumIntegerDigits: 2, useGrouping: false }}
				value={time.seconds}
				suffix="s"
			/>
		</NumberFlowGroup>
	</span>
)
const ExchangeRow = ({ exchanges, timeRemaining, timeUntilOpen }: any) => {
	const [prefix, setPrefix] = useState('')
	return (
		<div
			onMouseLeave={() => {
				setPrefix('')
			}}
			onMouseEnter={() => {
				setPrefix(timeUntilOpen ? 'opens in ' : 'closes in ')
			}}
			className="flex items-center justify-between rounded-full bg-white px-6 py-2 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-50"
		>
			<span className="text-gray-700">{exchanges}</span>
			<AnimatedTimer
				time={timeUntilOpen ? timeUntilOpen : timeRemaining}
				className={timeUntilOpen ? 'text-red-700' : 'text-green-600'}
				prefix={prefix}
			/>
		</div>
	)
}

export const Cntdwn = () => {
	const [timezone, setTimezone] = useState('')

	useEffect(() => {
		// Extract the UTC offset
		const offset = new Date().getTimezoneOffset() / -60 // Timezone offset in hours
		setTimezone(`UTC ${offset >= 0 ? '+' : ''}${offset}`)
	}, [])

	const [exchangeList, setExchanges] = useState(getUpdatedExchanges())
	useEffect(() => {
		const interval = setInterval(() => {
			setExchanges(getUpdatedExchanges())
		}, 1000)

		return () => clearInterval(interval) // Cleanup interval on component unmount
	}, [])

	return (
		<div className="h-screen bg-gray-100 p-4">
			<div className="relative mx-auto h-[800px] w-full overflow-y-auto rounded-lg bg-white shadow-md ">
				<div className="pointer-events-none fixed z-10 mb-4  w-[inherit] items-center pr-12">
					<div className="flex w-full justify-between  rounded-lg p-6 backdrop-blur-sm">
						<h1 className="text-xl font-bold text-[#444]">
							MKT CNTDWN
						</h1>
						<div className="relative flex">
							<input
								type="text"
								placeholder="Search Exchange"
								className="pointer-events-auto w-64 rounded-full border border-gray-300 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring focus:ring-blue-300"
							/>
							<svg
								className="absolute left-3 top-3 h-4 w-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M10 2a8 8 0 015.66 13.66l4.09 4.09a1 1 0 01-1.42 1.42l-4.09-4.09A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
							</svg>
						</div>

						<div className="flex space-x-4 text-sm text-gray-500">
							<button className="font-bold text-black">
								relative
							</button>
							<button>absolute</button>
						</div>
					</div>
				</div>

				<div className="mt-10 p-6">
					{exchangeList.map(
						(
							{
								country,
								flag,
								exchanges,
								timeRemaining,
								timeUntilOpen
							},
							index
						) => (
							<Fragment key={exchanges}>
								{(index === 0 ||
									(index > 0 &&
										(exchangeList[index] as any).flag !=
											(exchangeList[index - 1] as any)
												.flag)) && (
									<div className="mb-2 mt-6 flex items-center space-x-2">
										<span className="text-xl">{flag}</span>
										<h2 className="text-lg font-bold">
											{country}
										</h2>
									</div>
								)}
								<ExchangeRow
									key={exchanges}
									country={country}
									flag={flag}
									exchanges={exchanges}
									timeRemaining={timeRemaining}
									timeUntilOpen={timeUntilOpen}
								/>
							</Fragment>
						)
					)}
					<div className="mt-6 flex items-center justify-end text-sm text-gray-500">
						<span>{timezone}</span>
					</div>
				</div>
			</div>
		</div>
	)
}