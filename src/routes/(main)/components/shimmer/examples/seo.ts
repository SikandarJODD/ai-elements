import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Shimmer",
	description:
		"The Shimmer component provides an animated shimmer effect for text, perfect for loading states and highlighting content in your AI applications. Fully customizable with duration, spread, and element type options.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Shimmer - Svelte AI Elements",
		description:
			"The Shimmer component provides an animated shimmer effect for text, perfect for loading states and highlighting content in your AI applications. Fully customizable with duration, spread, and element type options.",
		url: "https://svelte-ai-elements.vercel.app/components/shimmer",
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
		title: "Shimmer - Svelte AI Elements",
		description:
			"The Shimmer component provides an animated shimmer effect for text, perfect for loading states and highlighting content in your AI applications. Fully customizable with duration, spread, and element type options.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
