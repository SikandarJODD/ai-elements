import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Steps",
	description:
		"Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Steps - Prompt Kit",
		description:
			"Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.",
		url: "https://ai-elements.vercel.app/prompt-kit/steps",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Prompt Kit - Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Steps - Prompt Kit",
		description:
			"Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Steps Component",
	},
};
