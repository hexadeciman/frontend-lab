import { Text } from 'components/common/Text'
import React, { useState } from 'react'

const DragAndDropJSONValidator: React.FC = () => {
	const [validFiles, setValidFiles] = useState<string[]>([])
	const [invalidFiles, setInvalidFiles] = useState<string[]>([])

	const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
		event.preventDefault()

		const files = Array.from(event.dataTransfer.files)
		const newValidFiles: string[] = []
		const newInvalidFiles: string[] = []

		files.forEach((file) => {
			if (file.type === 'application/json') {
				const reader = new FileReader()
				reader.onload = () => {
					try {
						JSON.parse(reader.result as string)
						newValidFiles.push(file.name)
					} catch (error) {
						newInvalidFiles.push(file.name)
					}
					updateFileLists(newValidFiles, newInvalidFiles)
				}
				reader.readAsText(file)
			} else {
				newInvalidFiles.push(file.name)
				updateFileLists(newValidFiles, newInvalidFiles)
			}
		})
	}

	const updateFileLists = (valid: string[], invalid: string[]): void => {
		setValidFiles(valid)
		setInvalidFiles(invalid)
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
		event.preventDefault()
	}

	return (
		<>
			<Text size="header" className="mt-4 w-full text-center">
				JSON Files validator
			</Text>

			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				style={{
					border: '2px dashed gray',
					borderRadius: '10px',
					padding: '20px',
					width: '400px',
					margin: '20px auto'
				}}
			>
				<h2>Drag and Drop JSON Files Here</h2>
				<div>
					<h3 style={{ color: 'green' }}>
						Valid Files: {validFiles.length}
					</h3>
					<ul className="ml-4">
						{validFiles.map((file, index) => (
							<li key={index} style={{ color: 'green' }}>
								<span>&#x2714;</span> {file}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 style={{ color: 'red' }}>
						Invalid Files: {invalidFiles.length}
					</h3>
					<ul className="ml-4">
						{invalidFiles.map((file, index) => (
							<li key={index} style={{ color: 'red' }}>
								<span>&#x2718;</span> {file}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default DragAndDropJSONValidator
