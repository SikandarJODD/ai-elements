import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Feedback Bar",
	description:
		"A feedback component with thumbs up/down buttons for collecting user feedback on AI responses.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Feedback Bar - Prompt Kit",
		description:
			"A feedback component with thumbs up/down buttons for collecting user feedback on AI responses.",
		url: "https://svelte-ai-elements.vercel.app/prompt-kit/feedback-bar",
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
		title: "Feedback Bar - Prompt Kit",
		description:
			"A feedback component with thumbs up/down buttons for collecting user feedback on AI responses.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Feedback Bar Component",
	},
};

