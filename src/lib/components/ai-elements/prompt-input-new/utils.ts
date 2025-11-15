/**
 * Converts a blob URL to a data URL
 * This is needed because blob URLs are temporary and won't work after page reload
 * or when sent to a server
 */
export async function convertBlobUrlToDataUrl(url: string): Promise<string> {
	const response = await fetch(url);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
