import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "System Message",
	description:
		"Display contextual information, warnings, or instructions in AI interfaces with customizable variants and call-to-action buttons.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "System Message - Prompt Kit",
		description:
			"Display contextual information, warnings, or instructions in AI interfaces with customizable variants and call-to-action buttons.",
		url: "https://ai-elements.vercel.app/prompt-kit/system-message",
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
		title: "System Message - Prompt Kit",
		description:
			"Display contextual information, warnings, or instructions in AI interfaces with customizable variants and call-to-action buttons.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - System Message Component",
	},
};
