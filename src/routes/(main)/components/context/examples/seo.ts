import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Context",
	description:
		"The Context component provides a comprehensive view of AI model usage through a compound component system.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Context - Svelte AI Elements",
		description:
			"The Context component provides a comprehensive view of AI model usage through a compound component system.",
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
		title: "Context - Svelte AI Elements",
		description:
			"The Context component provides a comprehensive view of AI model usage through a compound component system.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
