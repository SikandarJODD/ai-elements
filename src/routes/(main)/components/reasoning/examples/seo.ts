import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Reasoning",
	description:
		"The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Reasoning - Svelte AI Elements",
		description:
			"The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
		url: "https://svelte-ai-elements.vercel.app//components/reasoning",
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
		title: "Reasoning - Svelte AI Elements",
		description:
			"The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
