<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
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
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/source/llms.txt`;

	// Component API Props Data
	const sourceProps = [
		{
			name: "href",
			type: "string",
			description: "The URL of the source",
		},
		{
			name: "children",
			type: "Snippet",
			description: "The content to display",
		},
	];

	const sourceTriggerProps = [
		{
			name: "label",
			type: "string | number",
			description: "The label to display",
		},
		{
			name: "showFavicon",
			type: "boolean",
			default: "false",
			description: "Whether to show the favicon",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const sourceContentProps = [
		{
			name: "title",
			type: "string",
			description: "The title to display",
		},
		{
			name: "description",
			type: "string",
			description: "The description to display",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
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
			<Subheading class="mb-4 md:text-3xl">Source</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				Displays website sources used by AI-generated content, showing URL details, titles,
				and descriptions on hover.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="source"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Source" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/source.json`]}
					component="source"
					registry="prompt-kit"
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Source -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-source">Basic Source</h3>
			<Playground
				code={examples.basic.code}
				component="source"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Custom Source -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="custom-source">Custom Source</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Customize the appearance and labels of the source components. You can use custom
				labels, numbers, or combine them with favicons.
			</p>
			<Playground
				code={examples.custom.code}
				component="source"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.custom.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Source -->
			<ComponentAPITable
				componentName="Source"
				props={sourceProps}
				class="mt-6"
				id="source-props"
			/>

			<!-- SourceTrigger -->
			<ComponentAPITable
				componentName="SourceTrigger"
				props={sourceTriggerProps}
				id="source-trigger-props"
			/>

			<!-- SourceContent -->
			<ComponentAPITable
				componentName="SourceContent"
				props={sourceContentProps}
				id="source-content-props"
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
