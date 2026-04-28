export type Guide = {
	id: string;
	date: string;
	title: string;
	description: string;
	playground_url?: string; // cookbook playground url
}

export const guidesData: Guide[] = [
	{
		id: "basic-setup",
		date: "29 April 2026",
		title: "Basic Setup Guide",
		description:
			"Complete setup guide for Svelte AI Elements.",
	},
	{
		id: "svelte-5-ai-sdk-integration",
		date: "29 April 2026",
		title: "Svelte 5 + AI SDK Integration",
		description:
			"Learn how to integrate AI Elements with the AI SDK.",
		// playground_url: "/cookbook-playground/stream-text",
	},
	// Add more guides here as they are created
];
