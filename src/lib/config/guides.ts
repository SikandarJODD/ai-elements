export type Guide = {
	id: string;
	date: string;
	title: string;
	description: string;
};

export const guidesData: Guide[] = [
	{
		id: "basic-setup",
		date: "29 April 2026",
		title: "Basic Setup Guide",
		description: "Complete setup guide for Svelte AI Elements.",
	},
	{
		id: "svelte-5-ai-sdk-integration",
		date: "29 April 2026",
		title: "Svelte 5 + AI SDK Integration",
		description: "Learn how to integrate AI Elements with the AI SDK.",
	},
	// Add more guides here as they are created
];
