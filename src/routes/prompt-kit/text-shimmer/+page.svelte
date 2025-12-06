<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		H3,
		AiInstallCommand,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Playground from "$lib/components/docs/playground.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import PromptKitPrevNext from "$lib/components/prompt-kit/prompt-kit-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/text-shimmer/llms.txt`;

	// Component API Props Data
	const textShimmerProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to display with shimmer effect",
		},
		{
			name: "as",
			type: "keyof HTMLElementTagNameMap",
			default: '"span"',
			description: "HTML element to render as",
		},
		{
			name: "duration",
			type: "number",
			default: "4",
			description: "Animation duration in seconds",
		},
		{
			name: "spread",
			type: "number",
			default: "20",
			description: "Spread of shimmer highlight (5-45)",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLElement>",
			description: "All other element props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<!-- Title -->
			<Subheading class="mb-4 md:text-3xl">Text Shimmer</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A text component with an animated shimmer effect, perfect for indicating AI thinking
				or loading states
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="text-shimmer"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Text Shimmer" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/p/text-shimmer.json`,
					]}
					component="text-shimmer"
					registry="prompt-kit"
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic text shimmer -->
			<H3>Basic text shimmer</H3>
			<Playground
				code={examples.basic.code}
				component="text-shimmer"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Custom duration and spread -->
			<H3>Custom duration and spread</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Customize the animation with <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>duration</code
				>
				(in seconds) and <code class="bg-muted rounded px-1.5 py-0.5 text-sm">spread</code> (5-45)
				props.
			</p>
			<Playground
				code={examples.custom.code}
				component="text-shimmer"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.custom.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- TextShimmer -->
			<H3>TextShimmer</H3>
			<ComponentAPITable
				componentName="TextShimmer"
				props={textShimmerProps}
				class="mt-4"
				id="text-shimmer-props"
			/>

			<PromptKitPrevNext currentSlug="text-shimmer" />
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="mb-4 text-sm font-semibold">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
