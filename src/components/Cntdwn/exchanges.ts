const duration = (hours: number, minutes: number, seconds: number) => ({
	hours,
	minutes,
	seconds
})

export const exchanges = [
	{
		flag: '🇺🇸',
		country: 'United States',
		exchanges: 'NASDAQ, NYSE',
		openTime: new Date('1970-01-01T09:30:00-05:00'), // EST
		closeTime: new Date('1970-01-01T16:00:00-05:00') // EST
	},
	{
		flag: '🇺🇸',
		country: 'United States',
		exchanges: 'NYMEX',
		openTime: new Date('1970-01-01T08:00:00-05:00'), // EST
		closeTime: new Date('1970-01-01T17:00:00-05:00') // EST
	},
	{
		flag: '🇨🇦',
		country: 'Canada',
		exchanges: 'Toronto Stock Exchange, Toronto Ventures Exchange',
		openTime: new Date('1970-01-01T09:30:00-05:00'), // EST
		closeTime: new Date('1970-01-01T16:00:00-05:00') // EST
	},
	{
		flag: '🇬🇧',
		country: 'United Kingdom',
		exchanges: 'London Stock Exchange',
		openTime: new Date('1970-01-01T08:00:00+00:00'), // GMT
		closeTime: new Date('1970-01-01T16:30:00+00:00') // GMT
	},
	{
		flag: '🇯🇵',
		country: 'Japan',
		exchanges: 'Tokyo Stock Exchange',
		openTime: new Date('1970-01-01T09:00:00+09:00'), // JST
		closeTime: new Date('1970-01-01T15:00:00+09:00') // JST
	},
	{
		flag: '🇩🇪',
		country: 'Germany',
		exchanges: 'Frankfurt Stock Exchange',
		openTime: new Date('1970-01-01T09:00:00+01:00'), // CET
		closeTime: new Date('1970-01-01T17:30:00+01:00') // CET
	},
	{
		flag: '🇦🇺',
		country: 'Australia',
		exchanges: 'Australian Securities Exchange',
		openTime: new Date('1970-01-01T10:00:00+11:00'), // AEDT
		closeTime: new Date('1970-01-01T16:00:00+11:00') // AEDT
	},
	{
		flag: '🇨🇭',
		country: 'Switzerland',
		exchanges: 'SIX Swiss Exchange',
		openTime: new Date('1970-01-01T09:00:00+01:00'), // CET
		closeTime: new Date('1970-01-01T17:30:00+01:00') // CET
	},
	{
		flag: '🇲🇦',
		country: 'Morocco',
		exchanges: 'Casablanca Stock Exchange',
		openTime: new Date('1970-01-01T09:30:00+01:00'), // CET
		closeTime: new Date('1970-01-01T15:30:00+01:00') // CET
	},
	{
		flag: '🇮🇳',
		country: 'India',
		exchanges: 'Bombay Stock Exchange, National Stock Exchange',
		openTime: new Date('1970-01-01T09:15:00+05:30'), // IST
		closeTime: new Date('1970-01-01T15:30:00+05:30') // IST
	},
	{
		flag: '🇭🇰',
		country: 'Hong Kong',
		exchanges: 'Hong Kong Stock Exchange',
		openTime: new Date('1970-01-01T09:30:00+08:00'), // HKT
		closeTime: new Date('1970-01-01T16:00:00+08:00') // HKT
	},
	{
		flag: '🇨🇳',
		country: 'China',
		exchanges: 'Shanghai Stock Exchange, Shenzhen Stock Exchange',
		openTime: new Date('1970-01-01T09:30:00+08:00'), // CST
		closeTime: new Date('1970-01-01T15:00:00+08:00') // CST
	},
	{
		flag: '🇧🇷',
		country: 'Brazil',
		exchanges: 'B3 (Brasil Bolsa Balcão)',
		openTime: new Date('1970-01-01T10:00:00-03:00'), // BRT
		closeTime: new Date('1970-01-01T17:30:00-03:00') // BRT
	},
	{
		flag: '🇿🇦',
		country: 'South Africa',
		exchanges: 'Johannesburg Stock Exchange',
		openTime: new Date('1970-01-01T09:00:00+02:00'), // SAST
		closeTime: new Date('1970-01-01T17:00:00+02:00') // SAST
	},
	{
		flag: '🇸🇬',
		country: 'Singapore',
		exchanges: 'Singapore Exchange',
		openTime: new Date('1970-01-01T09:00:00+08:00'), // SGT
		closeTime: new Date('1970-01-01T17:00:00+08:00') // SGT
	},
	{
		flag: '🇸🇦',
		country: 'Saudi Arabia',
		exchanges: 'Tadawul (Saudi Stock Exchange)',
		openTime: new Date('1970-01-01T10:00:00+03:00'), // AST
		closeTime: new Date('1970-01-01T15:00:00+03:00') // AST
	}
]

// Helper function to calculate time difference
const calculateTimeDifference = (targetTime: Date) => {
	const now = new Date()
	// Extract time components (hours, minutes, seconds)
	const targetInMs =
		targetTime.getHours() * 3600000 +
		targetTime.getMinutes() * 60000 +
		targetTime.getSeconds() * 1000
	const nowInMs =
		now.getHours() * 3600000 +
		now.getMinutes() * 60000 +
		now.getSeconds() * 1000

	let diffMs = targetInMs - nowInMs

	// If the target time is earlier in the day (e.g., now is 23:00, target is 06:00),
	// add 24 hours to normalize to the next day
	if (diffMs < 0) {
		diffMs += 24 * 60 * 60 * 1000 // Add 24 hours in milliseconds
	}

	// Calculate hours, minutes, and seconds
	const hours = Math.floor(diffMs / (1000 * 60 * 60))
	const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

	return duration(hours, minutes, seconds)
}

// Function to get updated exchanges
export const getUpdatedExchanges = (orderMode: number) => {
	return [...exchanges]
		.sort((a, b) => {
			switch (orderMode) {
				case 1: {
					return a.openTime.getTime() - b.openTime.getTime()
				}
				case 2: {
					return b.openTime.getTime() - a.openTime.getTime()
				}
				default: {
					return 0
				}
			}
		})
		.map((exchange) => {
			const now = new Date()
			const nowTime = now.getHours() * 60 + now.getMinutes() // Convert current time to minutes of the day
			const openTime =
				exchange.openTime.getHours() * 60 +
				exchange.openTime.getMinutes() // Convert open time to minutes of the day
			const closeTime =
				exchange.closeTime.getHours() * 60 +
				exchange.closeTime.getMinutes() // Convert close time to minutes of the day
			const isOpen = nowTime >= openTime && nowTime <= closeTime

			return {
				flag: exchange.flag,
				country: exchange.country,
				exchanges: exchange.exchanges,
				timeRemaining: isOpen
					? calculateTimeDifference(exchange.closeTime)
					: null,
				timeUntilOpen: !isOpen
					? calculateTimeDifference(exchange.openTime)
					: null
			}
		})
}
