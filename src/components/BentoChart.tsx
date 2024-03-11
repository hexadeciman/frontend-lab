import React, { useCallback, useMemo, useRef } from 'react'
import Highcharts, { ChartLoadCallbackFunction } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import borderRadius from 'highcharts-border-radius'
borderRadius(Highcharts)
interface BarChartProps {
	data: number[]
}

function easeOutQuint(x: number): number {
	return 1 + --x * x * x * x * x
}
export const BentoChart: React.FC<BarChartProps> = ({ data }) => {
	const chartRef = useRef<any>(null)

	const onReady: ChartLoadCallbackFunction = useCallback(
		(ev) => {
			const chart = ev.target as any
			// Highlight the two highest bars
			const sortedData = data.slice().sort((a, b) => b - a)
			const maxValues = sortedData.slice(0, 2)
			if (chart.series) {
				chart.series[0].data.forEach((point: any) => {
					if (maxValues.includes((point as any).y)) {
						point.update({ color: '#A548EE' })
					} else {
						point.update({ color: '#EE489F' })
					}
				})
			}
		},
		[data]
	)

	const options: Highcharts.Options = useMemo(
		() => ({
			chart: {
				spacing: [0, 0, 0, 0], // Remove padding from top, right, bottom, and left
				width: 438, // Specify the width of the chart
				height: 150, // Specify the height of the chart
				marginTop: 0, // Add space on top of the chart for the tooltip
				events: {
					load: onReady
				},
				type: 'column'
			},
			title: {
				text: undefined
			},
			credits: {
				enabled: false // Hide the Highcharts credit
			},
			legend: {
				enabled: false // Hide the legend
			},
			xAxis: {
				categories: ['03', '04', '05', '06', '07', '08', '09'],
				lineWidth: 0, // Hide the x-axis line,
				labels: {
					style: {
						color: '#545A70' // Set the color of the x-axis labels
					}
				}
			},
			yAxis: {
				visible: false
			},
			plotOptions: {
				column: {
					borderRadius: 8,
					pointPadding: 0,
					groupPadding: 0.1,
					borderWidth: 0,
					borderRadiusTopLeft: 8,
					borderRadiusTopRight: 8,
					borderRadiusBottomRight: 8,
					borderRadiusBottomLeft: 8,
					animation: {
						duration: 1000, // Set the duration of the initial animation to 500 milliseconds (adjust as needed)
						easing: easeOutQuint
					}
				},
				series: {
					clip: false,
					cursor: 'pointer',
					point: {
						events: {
							mouseOver: function () {
								this.series.chart.tooltip.refresh(this)
							}
						}
					}
				}
			},
			tooltip: {
				borderRadius: 5, // Set the radius of the tooltip rectangle
				backgroundColor: 'rgba(255, 255, 255, 1)', // Set the background color of the tooltip
				borderWidth: 1, // Remove the border of the tooltip
				shadow: false, // Disable the shadow of the tooltip
				hideDelay: 0,
				useHTML: true,
				followPointer: true,
				formatter: function () {
					return `<b>${this.x}</b><br/>${this.y} Visits`
				},
				shared: true,
				animation: {
					enabled: true,
					duration: 500,
					easing: easeOutQuint // Pass the custom easing function
				},
				positioner: function (labelWidth, labelHeight, point) {
					const chart = this.chart
					const plotLeft = chart.plotLeft
					const plotTop = chart.plotTop
					const plotWidth = chart.plotWidth

					let x, y

					// Calculate x position based on cursor position
					if (point.plotX + labelWidth < plotLeft + plotWidth / 2) {
						x = point.plotX + plotLeft
					} else {
						x = point.plotX + plotLeft - labelWidth
					}

					// Calculate y position based on cursor position
					if (point.plotY - labelHeight < plotTop) {
						y = point.plotY + plotTop
					} else {
						y = point.plotY + plotTop - labelHeight
					}

					return {
						x: x,
						y: y
					}
				}
			},
			series: [
				{
					data: data,
					color: '#EE489F'
				} as any
			]
		}),
		[data, onReady]
	)

	return (
		<HighchartsReact
			className="h-[150px] w-full"
			highcharts={Highcharts}
			options={options}
			ref={chartRef}
		/>
	)
}
