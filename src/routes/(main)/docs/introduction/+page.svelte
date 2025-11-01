<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<MetaTags
	title="Introduction - Svelte AI Elements"
	description="Svelte AI Elements is a curated set of Svelte components for building polished AI interfaces, from prompt inputs to streaming responses."
	openGraph={{
		title: "Introduction - Svelte AI Elements",
		description:
			"Svelte AI Elements is a curated set of Svelte components for building polished AI interfaces, from prompt inputs to streaming responses.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app//docs/introduction",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-12 lg:py-12">
	<!-- <div class="md:px-6 py-4 md:py-6"> -->
	<h1
		class="text-foreground text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
	>
		Introduction
	</h1>

	<div class="mt-8 flex flex-col gap-6 md:gap-5">
		<p
			class="text-muted-foreground max-w-4xl text-base leading-7 sm:text-lg md:text-lg md:leading-8"
		>
			<span class="text-primary">Svelte AI Elements</span> is a custom registy built on top of
			<a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://shadcn-svelte.com"
				target="_blank"
				rel="noreferrer noopener">shadcn-svelte</a
			> to help you build AI-native applications faster.
		</p>

		<p class="text-muted-foreground max-w-4xl text-base leading-7 sm:text-lg md:leading-8">
			It provides a set of customizable, high-quality components build for AI applications
			like prompt input, messages, conversation, response and more.
		</p>

		<p class="text-muted-foreground max-w-4xl text-base leading-7 sm:text-lg md:leading-8">
			Svelte AI Elements is open source. Check out the code and contribute on <a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://github.com/SikandarJODD/ai-elements"
				target="_blank"
				rel="noreferrer noopener">GitHub</a
			>.
		</p>
	</div>
	<!-- </div> -->
</Sidebar.Inset>
