import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Task",
	description:
		"The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking. It consists of a main Task container with TaskTrigger for the clickable header and TaskContent for the collapsible content area.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Task - Svelte AI Elements",
		description:
			"The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking. It consists of a main Task container with TaskTrigger for the clickable header and TaskContent for the collapsible content area.",
		url: "https://ai-elements.vercel.app/components/task",
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
		title: "Task - Svelte AI Elements",
		description:
			"The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking. It consists of a main Task container with TaskTrigger for the clickable header and TaskContent for the collapsible content area.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
