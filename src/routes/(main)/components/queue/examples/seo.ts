import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Queue",
	description:
		"A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Queue - Svelte AI Elements",
		description:
			"A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.",
		url: "https://svelte-ai-elements.vercel.app/components/queue",
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
		title: "Queue - Svelte AI Elements",
		description:
			"A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
