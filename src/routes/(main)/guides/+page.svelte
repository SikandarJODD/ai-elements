<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button/index.js";
	import { guidesData } from "$lib/config/guides-data";
	import AllBlogs from "$lib/components/docs/guides/all-blogs.svelte";
</script>

<MetaTags
	title="Guides - Svelte AI Elements"
	description="Step-by-step guides to help you build AI-powered applications with Svelte AI Elements. Learn best practices, integration patterns, and real-world examples."
	keywords={[
		"Svelte AI guides",
		"AI tutorials",
		"Svelte AI Elements",
		"AI integration",
		"step-by-step guides",
	]}
	canonical="https://svelte-ai-elements.vercel.app/guides"
	openGraph={{
		type: "website",
		title: "Guides - Svelte AI Elements",
		description:
			"Step-by-step guides to help you build AI-powered applications with Svelte AI Elements.",
		url: "https://svelte-ai-elements.vercel.app/guides",
		siteName: "Svelte AI Elements",
	}}
/>

<AllBlogs blogs={guidesData} />
