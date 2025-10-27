import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Prompt Suggestion",
	description:
		"A component for implementing interactive prompt suggestions in AI interfaces. The PromptSuggestion component offers two distinct modes: Normal Mode and Highlight Mode.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Prompt Suggestion - Prompt Kit",
		description:
			"A component for implementing interactive prompt suggestions in AI interfaces. The PromptSuggestion component offers two distinct modes: Normal Mode and Highlight Mode.",
		url: "https://ai-elements.vercel.app/prompt-kit/prompt-suggestion",
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
		title: "Prompt Suggestion - Prompt Kit",
		description:
			"A component for implementing interactive prompt suggestions in AI interfaces. The PromptSuggestion component offers two distinct modes: Normal Mode and Highlight Mode.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Prompt Suggestion Component",
	},
};
