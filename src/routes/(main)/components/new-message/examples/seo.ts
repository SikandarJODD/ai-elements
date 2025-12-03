import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "New Message",
	description:
		"Enhanced message component with branching, attachments, actions, and markdown rendering for AI chat interfaces in Svelte 5.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "New Message - Svelte AI Elements",
		description:
			"Enhanced message component with branching, attachments, actions, and markdown rendering for AI chat interfaces in Svelte 5.",
		url: "https://svelte-ai-elements.vercel.app/components/new-message",
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
		title: "New Message - Svelte AI Elements",
		description:
			"Enhanced message component with branching, attachments, actions, and markdown rendering for AI chat interfaces in Svelte 5.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements",
	},
};

