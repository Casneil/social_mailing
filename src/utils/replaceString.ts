export const replaceString = (
	originalString: string,
	lookup: string,
	replacementString: string): string => {
	return originalString.replace(lookup, replacementString)
};