import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Panel - Workflow Components",
	description:
		"A positioned container for custom UI elements on Svelte Flow canvases with modern card styling and backdrop blur.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Panel - Workflow Components - Svelte AI Elements",
		description:
			"A positioned container for custom UI elements on Svelte Flow canvases with modern card styling and backdrop blur.",
		url: "https://svelte-ai-elements.vercel.app//components/workflow/panel",
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
		title: "Panel - Workflow Components - Svelte AI Elements",
		description:
			"A positioned container for custom UI elements on React Flow canvases with modern card styling and backdrop blur.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Panel Component",
	},
};
