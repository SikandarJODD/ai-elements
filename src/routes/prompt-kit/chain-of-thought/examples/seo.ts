import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Chain of Thought",
	description:
		"A composable component for displaying AI's step-by-step reasoning process. Features collapsible steps with custom icons, content items, and visual connectors to show the thinking flow.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Chain of Thought - Prompt Kit",
		description:
			"A composable component for displaying AI's step-by-step reasoning process. Features collapsible steps with custom icons, content items, and visual connectors to show the thinking flow.",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit/chain-of-thought",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Prompt Kit - Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app/",
		cardType: "summary_large_image",
		title: "Chain of Thought - Prompt Kit",
		description:
			"A composable component for displaying AI's step-by-step reasoning process. Features collapsible steps with custom icons, content items, and visual connectors to show the thinking flow.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Chain of Thought Component",
	},
};
