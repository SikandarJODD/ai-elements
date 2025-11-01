import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Node - Workflow Components",
	description:
		"A composable, Card-based node for Svelte Flow canvases with connection handles and structured layouts.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Node - Workflow Components - Svelte AI Elements",
		description:
			"A composable, Card-based node for Svelte Flow canvases with connection handles and structured layouts.",
		url: "https://svelte-ai-elements.vercel.app//components/workflow/node",
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
		title: "Node - Workflow Components - Svelte AI Elements",
		description:
			"A composable, Card-based node for React Flow canvases with connection handles and structured layouts.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Node Component",
	},
};
