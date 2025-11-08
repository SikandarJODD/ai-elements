import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Checkpoint",
	description:
		"A simple component for marking conversation history points and restoring the chat to a previous state. Inspired by VSCode's Copilot checkpoint feature.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Checkpoint - Svelte AI Elements",
		description:
			"A simple component for marking conversation history points and restoring the chat to a previous state. Inspired by VSCode's Copilot checkpoint feature.",
		url: "https://svelte-ai-elements.vercel.app/components/checkpoint",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app/",
		cardType: "summary_large_image",
		title: "Checkpoint - Svelte AI Elements",
		description:
			"A simple component for marking conversation history points and restoring the chat to a previous state. Inspired by VSCode's Copilot checkpoint feature.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
