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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/thinking-bar/llms.txt`;

	// Component API Props Data
	const thinkingBarProps = [
		{
			name: "text",
			type: "string",
			default: '"Thinking"',
			description: "Text to display with shimmer effect",
		},
		{
			name: "onStop",
			type: "() => void",
			description: "Callback when stop button is clicked",
		},
		{
			name: "stopLabel",
			type: "string",
			default: '"Answer now"',
			description: "Label for the stop button",
		},
		{
			name: "onclick",
			type: "() => void",
			description: "Callback when thinking text is clicked (shows chevron when set)",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
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
			<Subheading class="mb-4 md:text-3xl">Thinking Bar</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A component for displaying AI thinking state with animated shimmer text and optional
				stop button
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="thinking-bar"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Thinking Bar" {llmsTxtUrl} />
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
						`${PUBLIC_WEBSITE_URL}/p/thinking-bar.json`,
					]}
					component="thinking-bar"
					registry="prompt-kit"
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic thinking bar -->
			<H3>Basic thinking bar</H3>
			<Playground
				code={examples.basic.code}
				component="thinking-bar"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: With stop button -->
			<H3>With stop button</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Add a stop button using the <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>onStop</code
				>
				callback. Customize the button label with
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">stopLabel</code>.
			</p>
			<Playground
				code={examples.withStop.code}
				component="thinking-bar"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.withStop.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- ThinkingBar -->
			<H3>ThinkingBar</H3>
			<ComponentAPITable
				componentName="ThinkingBar"
				props={thinkingBarProps}
				class="mt-4"
				id="thinking-bar-props"
			/>

			<PromptKitPrevNext currentSlug="thinking-bar" />
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
