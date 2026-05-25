<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import { MetaTags } from "svelte-meta-tags";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/docs/llms.txt`;
</script>

<MetaTags
	title="Introduction - Svelte AI Elements"
	description="Svelte AI Elements provides core building blocks for AI apps with high-quality, accessible, customizable components."
	canonical="https://svelte-ai-elements.vercel.app/docs"
	openGraph={{
		url: "https://svelte-ai-elements.vercel.app/docs",
		title: "Introduction - Svelte AI Elements",
		description:
			"Svelte AI Elements provides core building blocks for AI apps with high-quality, accessible, customizable components.",
		type: "article",
		siteName: "Svelte AI Elements"
	}}
/>

<article class="mx-auto">
	<header class="mb-12">
		<div class="mb-6 flex flex-col md:flex-row items-start justify-between gap-4">
			<div class="space-y-4">
				<!-- <div class="flex flex-wrap items-center gap-2">
					<Badge variant="secondary">Docs</Badge>
					<Badge variant="secondary">Getting Started</Badge>
				</div> -->
				<h1 class="text-4xl font-semibold tracking-tight">
					Introduction
				</h1>
				<p class="text-muted-foreground max-w-3xl text-lg leading-relaxed">
					Svelte AI Elements provides core building blocks for AI apps with
					high-quality, accessible, customizable components.
				</p>
			</div>
			<CopyPageDropdown
				class="shrink-0"
				componentName="Svelte AI Elements Introduction"
				{llmsTxtUrl}
			/>
		</div>
	</header>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">Inspired by Vercel AI Elements</h2>
		<p class="text-muted-foreground max-w-3xl leading-relaxed">
			This project takes direct inspiration from Vercel AI Elements and adapts
			that idea to the Svelte ecosystem.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">Goal</h2>
		<p class="text-muted-foreground max-w-3xl leading-relaxed">
			The goal is to bring similar AI components to Svelte Ecosystem.
		</p>
	</section>
</article>
