import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Conversation",
	description:
		"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Conversation - Svelte AI Elements",
		description:
			"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
		url: "https://svelte-ai-elements.vercel.app//components/actions",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
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
		title: "Conversation - Svelte AI Elements",
		description:
			"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
