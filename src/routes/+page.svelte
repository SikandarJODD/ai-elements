<script lang="ts">
	import Hero from "$lib/components/landing/Hero.svelte";
	import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
	title="Svelte AI Elements"
	description="Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows."
	canonical="https://svelte-ai-elements.vercel.app/"
	openGraph={{
		url: "https://svelte-ai-elements.vercel.app/",
		title: "Svelte AI Elements",
		description:
			"Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows.",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
				type: "image/png",
			},
		],
	}}
	additionalLinkTags={[
		{
			rel: "icon",
			href: "https://svelte-ai-elements.vercel.app/favicon.svg",
		},
	]}
	twitter={{
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Svelte AI Elements",
		description:
			"Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	}}
/>
<Hero />
