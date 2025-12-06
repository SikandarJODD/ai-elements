import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Thinking Bar",
	description:
		"A component for displaying AI thinking state with animated shimmer text and optional stop button.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Thinking Bar - Prompt Kit",
		description:
			"A component for displaying AI thinking state with animated shimmer text and optional stop button.",
		url: "https://svelte-ai-elements.vercel.app/prompt-kit/thinking-bar",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
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
		title: "Thinking Bar - Prompt Kit",
		description:
			"A component for displaying AI thinking state with animated shimmer text and optional stop button.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Thinking Bar Component",
	},
};
