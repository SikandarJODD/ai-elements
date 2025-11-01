import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Edge - Workflow Components",
	description:
		"Pre-styled edge types for Svelte Flow canvases: Temporary for dashed connections and Animated with moving indicators.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Edge - Workflow Components - Svelte AI Elements",
		description:
			"Pre-styled edge types for Svelte Flow canvases: Temporary for dashed connections and Animated with moving indicators.",
		url: "https://svelte-ai-elements.vercel.app//components/workflow/edge",
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
		title: "Edge - Workflow Components - Svelte AI Elements",
		description:
			"Pre-styled edge types for React Flow canvases: Temporary for dashed connections and Animated with moving indicators.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Edge Component",
	},
};
