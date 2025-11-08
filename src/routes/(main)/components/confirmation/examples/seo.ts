import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Confirmation",
	description:
		"A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Confirmation - Svelte AI Elements",
		description:
			"A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.",
		url: "https://ai-elements.vercel.app/components/confirmation",
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
		site: "https://ai-elements.vercel.app/",
		cardType: "summary_large_image",
		title: "Confirmation - Svelte AI Elements",
		description:
			"A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
