<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
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
	const stepsProps = [
		{
			name: "defaultOpen",
			type: "boolean",
			default: "true",
			description: "Whether the Steps starts expanded",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
		},
	];

	const stepsTriggerProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Trigger content (label)",
		},
		{
			name: "leftIcon",
			type: "Snippet",
			description: "Optional left icon area; keeps width to avoid layout jump",
		},
		{
			name: "swapIconOnHover",
			type: "boolean",
			default: "true",
			description: "Swap leftIcon with chevron on hover",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const stepsContentProps = [
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "bar",
			type: "Snippet",
			description: "Optional bar element rendered at the left",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Content to display in the steps",
		},
	];

	const stepsBarProps = [
		{
			name: "className",
			type: "string",
			default: "bg-muted h-full w-[2px]",
			description: "Classes for positioning and style",
		},
	];

	const stepsItemProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Row item content",
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
			<Subheading class="md:text-3xl">Steps</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				Displays a sequence of operations in a collapsible layout. Each step can include
				details and an optional vertical bar. Useful for showing AI steps like reasoning
				traces, tool calls, or process logs.
			</p>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/steps.json`]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Steps basic -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="steps-basic">Steps basic</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Steps with sources -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="steps-with-sources">
				Steps with sources
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can use the <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Source</code> component
				to display sources in the Steps block.
			</p>
			<Playground code={examples.withSource.code}>
				<div class="flex w-full justify-center">
					<examples.withSource.Component />
				</div>
			</Playground>

			<!-- Example 3: Steps with custom icons swap and bar -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="steps-with-custom-icons">
				Steps with custom icons swap and bar
			</h3>
			<Playground code={examples.iconSwap.code}>
				<div class="flex w-full justify-center">
					<examples.iconSwap.Component />
				</div>
			</Playground>

			<!-- Example 4: Steps with Text Shimmer Loader -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="steps-with-loader">
				Steps with Text Shimmer Loader
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can use the <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Loader</code> component
				to display a text shimmer loader in the Steps block.
			</p>
			<Playground code={examples.withLoader.code}>
				<div class="flex w-full justify-center">
					<examples.withLoader.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Steps -->
			<ComponentAPITable
				componentName="Steps"
				props={stepsProps}
				class="mt-6"
				id="steps-props"
			/>

			<!-- StepsTrigger -->
			<ComponentAPITable
				componentName="StepsTrigger"
				props={stepsTriggerProps}
				id="steps-trigger-props"
			/>

			<!-- StepsContent -->
			<ComponentAPITable
				componentName="StepsContent"
				props={stepsContentProps}
				id="steps-content-props"
			/>

			<!-- StepsBar -->
			<ComponentAPITable
				componentName="StepsBar"
				props={stepsBarProps}
				id="steps-bar-props"
			/>

			<!-- StepsItem -->
			<ComponentAPITable
				componentName="StepsItem"
				props={stepsItemProps}
				id="steps-item-props"
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
