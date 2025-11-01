<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, ComponentAPITable } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import Heading from "$lib/components/docs/heading.svelte";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();
	// Component API Props Data
	const chainOfThoughtProps = [
		{
			name: "open",
			type: "boolean",
			description: "Controls whether the chain of thought is expanded (bindable)",
		},
		{
			name: "defaultOpen",
			type: "boolean",
			default: "false",
			description: "Whether the chain of thought is expanded by default",
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Callback function called when the open state changes",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Child components (typically ChainOfThoughtHeader and ChainOfThoughtContent)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const chainOfThoughtHeaderProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the header trigger",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render instead of the default 'Chain of Thought' text",
		},
	];

	const chainOfThoughtContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Chain of thought steps and content to display when expanded",
		},
	];

	const chainOfThoughtStepProps = [
		{
			name: "label",
			type: "string",
			description: "The main label/title for the step",
		},
		{
			name: "icon",
			type: "typeof Icon",
			description: "Lucide icon component to display for the step",
		},
		{
			name: "description",
			type: "string",
			description: "Optional description text for the step",
		},
		{
			name: "status",
			type: "'complete' | 'active' | 'pending'",
			default: "'complete'",
			description: "Visual status of the step",
		},
		{
			name: "delay",
			type: "number",
			description: "Custom animation delay in milliseconds (defaults to 150ms * step index)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the step",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Additional content to display within the step",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const chainOfThoughtImageProps = [
		{
			name: "caption",
			type: "string",
			description: "Caption text to display below the image",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the image container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Image element or content to display",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const chainOfThoughtSearchResultsProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the search results container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "ChainOfThoughtSearchResult components to display",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const chainOfThoughtSearchResultProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the search result badge",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Content to display in the search result badge",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLElement>",
			description: "All other Badge component props are supported",
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
			<Subheading class="md:text-3xl">Chain of Thought</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>ChainOfThought</CodeSpan> component provides a visual representation of
				an AI's reasoning process, showing step-by-step thinking with support for search results,
				images, and progress indicators. It helps users understand how AI arrives at conclusions.
			</p>

			<Playground code={examples.basic.code} class="flex items-start justify-start">
				<div class="mx-auto w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/chain-of-thought.json`}
				is_jsrepo={true}
				blockname="chain-of-thought"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	 import {
    ChainOfThought,
    ChainOfThoughtContent,
    ChainOfThoughtHeader,
    ChainOfThoughtImage,
    ChainOfThoughtSearchResult,
    ChainOfThoughtSearchResults,
    ChainOfThoughtStep,
  } from "$lib/components/ai-elements/chain-of-thought/index.js";
\<\/script\>

<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={SearchIcon}
      label="Searching for information"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Result 1
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- ChainOfThought -->
			<ComponentAPITable
				componentName="ChainOfThought"
				props={chainOfThoughtProps}
				class="mt-6"
				id="chain-of-thought-props"
			/>

			<!-- ChainOfThoughtHeader -->
			<ComponentAPITable
				componentName="ChainOfThoughtHeader"
				props={chainOfThoughtHeaderProps}
				id="chain-of-thought-header-props"
			/>

			<!-- ChainOfThoughtContent -->
			<ComponentAPITable
				componentName="ChainOfThoughtContent"
				props={chainOfThoughtContentProps}
				id="chain-of-thought-content-props"
			/>

			<!-- ChainOfThoughtStep -->
			<ComponentAPITable
				componentName="ChainOfThoughtStep"
				props={chainOfThoughtStepProps}
				id="chain-of-thought-step-props"
			/>

			<!-- ChainOfThoughtImage -->
			<ComponentAPITable
				componentName="ChainOfThoughtImage"
				props={chainOfThoughtImageProps}
				id="chain-of-thought-image-props"
			/>

			<!-- ChainOfThoughtSearchResults -->
			<ComponentAPITable
				componentName="ChainOfThoughtSearchResults"
				props={chainOfThoughtSearchResultsProps}
				id="chain-of-thought-search-results-props"
			/>

			<!-- ChainOfThoughtSearchResult -->
			<ComponentAPITable
				componentName="ChainOfThoughtSearchResult"
				props={chainOfThoughtSearchResultProps}
				id="chain-of-thought-search-result-props"
			/>
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
