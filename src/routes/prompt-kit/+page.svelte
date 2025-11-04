<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
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

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-12 lg:py-12">
	<div class="mt-8 flex max-w-3xl flex-col gap-6">
		<h1
			class="text-foreground mb-2 text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
		>
			Svelte Prompt Kit
		</h1>

		<div
			class="bg-muted/50 border-border mb-4 flex items-start gap-3 rounded-lg border px-4 py-3"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="text-muted-foreground mt-0.5 h-5 w-5 flex-shrink-0"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="16" x2="12" y2="12"></line>
				<line x1="12" y1="8" x2="12.01" y2="8"></line>
			</svg>
			<p class="text-muted-foreground text-sm leading-relaxed">
				<strong>Note:</strong> This is an unofficial Svelte port of
				<a
					class="hover:text-primary text-primary underline underline-offset-2"
					href="https://prompt-kit.com"
					target="_blank"
					rel="noreferrer noopener">Prompt Kit</a
				>, adapted for the Svelte ecosystem. While inspired by the original, this
				implementation is independently maintained and may differ in features and
				implementation details.
			</p>
		</div>

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
	</div>
</Sidebar.Inset>
