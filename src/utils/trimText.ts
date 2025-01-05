export const trimText = (text = '', maxLength = 200) => {
	// Check if the text is already within the limit
	if (text.length <= maxLength) {
		return text
	}
	// Trim the text to the maximum length
	const trimmedText = text.slice(0, maxLength)
	// Find the last space to avoid cutting off in the middle of a word
	const lastSpaceIndex = trimmedText.lastIndexOf(' ')
	// If there's no space, return the trimmed text without changes
	if (lastSpaceIndex === -1) {
		return trimmedText + '...'
	}
	// Return the trimmed text up to the last space, followed by ellipsis
	return trimmedText.slice(0, lastSpaceIndex) + '...'
}
