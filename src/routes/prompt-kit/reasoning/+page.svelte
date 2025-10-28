<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
	import Playground from "$lib/components/docs/playground.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// Component API Props Data
	const reasoningProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The content of the component",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "open",
			type: "boolean",
			description: "Control the open state (makes component controlled)",
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Callback when open state changes",
		},
		{
			name: "isStreaming",
			type: "boolean",
			description: "When false, automatically closes the reasoning (auto-close)",
		},
	];

	const reasoningTriggerProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The content of the trigger",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLButtonElement>",
			description: "Additional HTML button props",
		},
	];

	const reasoningContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The content to be displayed",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "contentClassName",
			type: "string",
			description: "Additional CSS classes for the content",
		},
		{
			name: "markdown",
			type: "boolean",
			default: "false",
			description: "Enable markdown rendering for the content",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "Additional HTML div props",
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
			<Subheading class="md:text-3xl">Reasoning</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				A collapsible component for showing AI reasoning, explanations, or logic. You can
				control it manually or let it auto-close when the stream ends. Markdown is
				supported.
			</p>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Usage -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-usage">Basic Usage</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The most basic implementation of the Reasoning component with auto-close
				functionality when streaming ends.
			</p>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: With Markdown -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="with-markdown">With Markdown</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Show rich formatting with markdown support for better structured reasoning content.
			</p>
			<Playground code={examples.markdown.code}>
				<div class="flex w-full justify-center">
					<examples.markdown.Component />
				</div>
			</Playground>

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
						"https://ai-elements.vercel.app/r/prompt-kit-reasoning.json",
					]}
				/>
			</div>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Reasoning -->
			<ComponentAPITable
				componentName="Reasoning"
				props={reasoningProps}
				class="mt-6"
				id="reasoning-props"
			/>

			<!-- ReasoningTrigger -->
			<ComponentAPITable
				componentName="ReasoningTrigger"
				props={reasoningTriggerProps}
				id="reasoning-trigger-props"
			/>

			<!-- ReasoningContent -->
			<ComponentAPITable
				componentName="ReasoningContent"
				props={reasoningContentProps}
				id="reasoning-content-props"
			/>
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
