<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import PromptKitPrevNext from "$lib/components/prompt-kit/prompt-kit-prev-next.svelte";
</script>

<MetaTags
	title="Introduction - Svelte Prompt Kit"
	description="Svelte Prompt Kit is a set of customizable, high-quality Svelte components built for AI applications."
	openGraph={{
		title: "Introduction - Svelte Prompt Kit",
		description:
			"Svelte Prompt Kit is a set of customizable, high-quality Svelte components built for AI applications.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte Prompt Kit",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-6">
	<div class="mt-8 flex max-w-4xl flex-col gap-6">
		<h1
			class="text-foreground mb-2 text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
		>
			Svelte Prompt Kit
		</h1>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			Svelte Prompt Kit is a collection of customizable, high-quality components built
			specifically for AI applications. It makes it easy to design beautiful chat experiences,
			AI agents, autonomous assistants, and more with minimal effort.
		</p>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			Built on top of <a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://shadcn-svelte.com"
				target="_blank"
				rel="noreferrer noopener">shadcn-svelte</a
			>, Svelte Prompt Kit follows the same design principles and philosophy. Instead of
			helping you build a general component library, it focuses specifically on creating
			polished AI interfaces.
		</p>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			This project is actively maintained and continuously evolving. We welcome your feedback,
			suggestions, and contributions as we expand the component collection and improve
			existing features!
		</p>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			Svelte Prompt Kit is open source and available under the MIT license. Check out the
			code, report issues, or contribute on <a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://github.com/SikandarJODD/ai-elements"
				target="_blank"
				rel="noreferrer noopener">GitHub</a
			>.
		</p>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			Inspired from Official <a
				class="hover:text-primary text-primary"
				href="https://www.prompt-kit.com"
				target="_blank"
				rel="noreferrer noopener">Prompt Kit</a
			>
			, built by Ibelick:
			<a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://x.com/ibelick"
				target="_blank"
				rel="noreferrer noopener">Ibelick</a
			>
		</p>

		<p class="text-muted-foreground text-base leading-7 sm:text-lg md:leading-8">
			<strong>Note:</strong> This is an unofficial Svelte port of
			<a
				class="hover:text-primary text-primary underline underline-offset-2"
				href="https://prompt-kit.com"
				target="_blank"
				rel="noreferrer noopener">Prompt Kit</a
			>, adapted for the Svelte ecosystem.
		</p>

		<PromptKitPrevNext currentSlug="introduction" />
	</div>
</Sidebar.Inset>
