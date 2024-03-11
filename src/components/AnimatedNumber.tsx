import React from 'react'
import { useSpring, animated } from 'react-spring'

interface AnimatedNumberProps {
	value: number
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
	const { number } = useSpring({
		from: { number: value - 100 },
		number: value,
		delay: 150,
		config: { tension: 280, friction: 120 }
	})

	return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
}

export default AnimatedNumber
