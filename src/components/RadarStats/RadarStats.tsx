/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useSpring, animated, useSprings } from 'react-spring'

// Player data with stats
const players = [
	{
		name: 'Vinícius Júnior',
		stats: {
			Pace: 95,
			Shooting: 78,
			Passing: 73,
			Dribbling: 90,
			Defending: 30,
			Physical: 70
		}
	},
	{
		name: 'Yamin Lamal',
		stats: {
			Pace: 83,
			Shooting: 72,
			Passing: 78,
			Dribbling: 85,
			Defending: 60,
			Physical: 70
		}
	},
	{
		name: 'Erling Haaland',
		stats: {
			Pace: 89,
			Shooting: 91,
			Passing: 65,
			Dribbling: 80,
			Defending: 45,
			Physical: 88
		}
	},
	{
		name: 'Kylian Mbappe',
		stats: {
			Pace: 97,
			Shooting: 89,
			Passing: 80,
			Dribbling: 92,
			Defending: 36,
			Physical: 76
		}
	},
	{
		name: 'Virgil van Dijk',
		stats: {
			Pace: 76,
			Shooting: 60,
			Passing: 70,
			Dribbling: 72,
			Defending: 91,
			Physical: 86
		}
	},
	{
		name: 'NGolo Kanté',
		stats: {
			Pace: 80,
			Shooting: 66,
			Passing: 75,
			Dribbling: 81,
			Defending: 87,
			Physical: 82
		}
	}
]
const statCategories = [
	'Pace',
	'Shooting',
	'Passing',
	'Dribbling',
	'Defending',
	'Physical'
]
const chartRadius = 100 // Radius of the radar chart
const svgWidth = 400
const svgHeight = 300
const centerX = svgWidth / 2
const centerY = svgHeight / 2

type OwnProps = {
	plop?: string
}
// Calculate target opacities for each category
const targetOpacities = (selectedPlayer: any) =>
	statCategories.map((category) => {
		const statValue = (selectedPlayer.stats as any)[category]
		return 0.2 + (statValue / 100) * 0.8
	})
export const RadarStats = ({ plop: _ }: OwnProps) => {
	const [selectedPlayer, setSelectedPlayer] = useState(players[0])

	// Function to convert stat to polar coordinates
	const calculatePoints = () => {
		const points = statCategories.map((category, index) => {
			const angle = (Math.PI * 2 * index) / statCategories.length // Calculate angle for each point
			const value =
				((selectedPlayer.stats as any)[category] / 100) * chartRadius // Scale value to chart radius
			const x = Math.cos(angle) * value + centerX // Calculate x position
			const y = Math.sin(angle) * value + centerY // Calculate y position
			return `${x},${y}`
		})
		return points.join(' ') // Join all points to form the polygon
	}

	// Use react-spring to animate the points
	const animatedProps = useSpring({
		points: calculatePoints(),
		config: { tension: 170, friction: 12 } // Adjust these values for a bounce effect
	})

	return (
		<div className="m-auto mt-3 flex w-fit flex-col items-center rounded-lg border border-white/20 bg-black p-6">
			{/* Player selection buttons */}
			<div className="flex space-x-4">
				{players.map((player) => (
					<button
						key={player.name}
						onClick={() => setSelectedPlayer(player)}
						onMouseEnter={() => setSelectedPlayer(player)}
						className={`rounded border px-2 py-1 text-xs text-white transition-all ${
							selectedPlayer.name === player.name
								? 'border-gray-400'
								: 'border-transparent bg-transparent  opacity-40'
						}`}
					>
						{player.name}
					</button>
				))}
			</div>
			<svg
				key={selectedPlayer.name} // Use key to reset animations on player change
				width={svgWidth}
				height={svgHeight}
			>
				{/* Draw circular grid */}
				{[100].map((r) => (
					<circle
						key={r}
						cx={centerX}
						cy={centerY}
						r={r}
						stroke="rgba(255, 255, 255, 0.2)"
						fill="none"
						strokeDasharray="4 4" // This creates a dashed stroke pattern
					/>
				))}
				{/* Draw radar shape with animated polygon */}
				<animated.polygon
					points={animatedProps.points}
					fill="rgba(75, 192, 192, 0.1)"
					stroke="rgba(255, 255, 255, 1)"
					strokeWidth="1"
				/>
				{/* Draw labels for each category */}
				{statCategories.map((category, index) => {
					const angle = (Math.PI * 2 * index) / statCategories.length
					const x = Math.cos(angle) * (chartRadius + 15) + centerX
					const y = Math.sin(angle) * (chartRadius + 15) + centerY
					const textAnchor =
						angle > Math.PI / 2 && angle < (3 * Math.PI) / 2
							? 'end'
							: 'start'

					// Calculate opacity based on stat value
					const statValue = (selectedPlayer.stats as any)[category]
					const opacity = 0.2 + (statValue / 100) * 0.8

					return (
						<text
							key={category}
							x={x}
							y={y}
							textAnchor={textAnchor}
							fontSize="12"
							fontWeight="bold"
							fill={`rgba(255, 255, 255, ${opacity})`} // Apply calculated opacity
						>
							{category}
						</text>
					)
				})}
			</svg>
		</div>
	)
}
