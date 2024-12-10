/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useSpring, animated, useSprings } from 'react-spring'

// Player data with stats
const players = [
	{
		name: 'Lionel Messi',
		stats: {
			Pace: 80,
			Shooting: 70,
			Passing: 60,
			Dribbling: 90,
			Defending: 50,
			Physical: 75
		}
	},
	{
		name: 'Cristiano Ronaldo',
		stats: {
			Pace: 60,
			Shooting: 100,
			Passing: 75,
			Dribbling: 65,
			Defending: 85,
			Physical: 70
		}
	},
	{
		name: 'Yamin Lamal',
		stats: {
			Pace: 90,
			Shooting: 85,
			Passing: 70,
			Dribbling: 75,
			Defending: 40,
			Physical: 95
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
const svgHeight = 400
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
		<div className="flex flex-col items-center bg-slate-950 p-6">
			{/* Player selection buttons */}
			<div className="flex space-x-4">
				{players.map((player) => (
					<button
						key={player.name}
						onClick={() => setSelectedPlayer(player)}
						onMouseEnter={() => setSelectedPlayer(player)}
						className={`rounded-lg border px-4 py-2 text-white transition-all ${
							selectedPlayer.name === player.name
								? 'border-gray-400'
								: 'border-transparent bg-transparent '
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
				{[2, 100].map((r) => (
					<circle
						key={r}
						cx={centerX}
						cy={centerY}
						r={r}
						stroke="rgba(255, 255, 255, 0.2)"
						fill="none"
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
