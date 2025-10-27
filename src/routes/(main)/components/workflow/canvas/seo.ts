import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Canvas - Workflow Components",
	description:
		"A Svelte Flow-based canvas for building interactive node-based interfaces with pre-configured defaults for AI applications.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Canvas - Workflow Components - Svelte AI Elements",
		description:
			"A Svelte Flow-based canvas for building interactive node-based interfaces with pre-configured defaults for AI applications.",
		url: "https://ai-elements.vercel.app/components/workflow/canvas",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Canvas - Workflow Components - Svelte AI Elements",
		description:
			"A React Flow-based canvas for building interactive node-based interfaces with pre-configured defaults for AI applications.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Canvas Component",
	},
};
