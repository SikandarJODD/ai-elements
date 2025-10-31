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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/chain-of-thought/llms.txt`;

	// Component API Props Data
	const chainOfThoughtProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The ChainOfThoughtStep components to display",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const chainOfThoughtStepProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The trigger and content components",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "isLast",
			type: "boolean",
			default: "false",
			description: "Whether this is the last step (hides connector line)",
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
			name: "...props",
			type: "CollapsibleRootProps",
			description: "Additional Collapsible component props from bits-ui",
		},
	];

	const chainOfThoughtTriggerProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The trigger text content",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "leftIcon",
			type: "Snippet",
			description: "Optional icon to display on the left side",
		},
		{
			name: "swapIconOnHover",
			type: "boolean",
			default: "true",
			description: "Whether to swap the left icon with chevron on hover",
		},
		{
			name: "...props",
			type: "CollapsibleTriggerProps",
			description: "Additional Collapsible trigger props from bits-ui",
		},
	];

	const chainOfThoughtContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The content items to display",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "CollapsibleContentProps",
			description: "Additional Collapsible content props from bits-ui",
		},
	];

	const chainOfThoughtItemProps = [
		{
			name: "children",
			type: "Snippet",
			description: "The item content",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
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
			<Subheading class="mb-4 md:text-3xl">Chain of Thought</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A composable component for displaying AI's step-by-step reasoning process. Features
				collapsible steps with custom icons, content items, and visual connectors to show
				the thinking flow.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Chain of Thought" {llmsTxtUrl} />
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
						`${PUBLIC_WEBSITE_URL}/p/chain-of-thought.json`,
					]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Usage -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-usage">Basic Usage</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A simple chain of thought showing the AI's reasoning process for selecting a sorting
				algorithm. Each step is collapsible and shows the progression of thought.
			</p>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Advanced with Icons and Code -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="advanced-usage">
				Advanced with Icons and Code
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A more complex example showing database optimization reasoning with custom icons for
				each step and embedded code blocks. Demonstrates the full power of the component
				with rich content.
			</p>
			<Playground code={examples.advanced.code}>
				<div class="flex w-full justify-center">
					<examples.advanced.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- ChainOfThought -->
			<ComponentAPITable
				componentName="ChainOfThought"
				props={chainOfThoughtProps}
				class="mt-6"
				id="chain-of-thought-props"
			/>

			<!-- ChainOfThoughtStep -->
			<ComponentAPITable
				componentName="ChainOfThoughtStep"
				props={chainOfThoughtStepProps}
				id="chain-of-thought-step-props"
			/>

			<!-- ChainOfThoughtTrigger -->
			<ComponentAPITable
				componentName="ChainOfThoughtTrigger"
				props={chainOfThoughtTriggerProps}
				id="chain-of-thought-trigger-props"
			/>

			<!-- ChainOfThoughtContent -->
			<ComponentAPITable
				componentName="ChainOfThoughtContent"
				props={chainOfThoughtContentProps}
				id="chain-of-thought-content-props"
			/>

			<!-- ChainOfThoughtItem -->
			<ComponentAPITable
				componentName="ChainOfThoughtItem"
				props={chainOfThoughtItemProps}
				id="chain-of-thought-item-props"
			/>

			<!-- Usage Notes Section -->
			<Subheading>Usage Notes</Subheading>

			<div class="text-muted-foreground space-y-4 text-sm leading-relaxed sm:text-base">
				<div>
					<h4 class="text-foreground mb-2 font-semibold">Component Structure</h4>
					<p>
						The Chain of Thought component follows a composable pattern. Wrap your steps
						in
						<code class="bg-muted rounded px-1.5 py-0.5">ChainOfThought</code>, then use
						<code class="bg-muted rounded px-1.5 py-0.5">ChainOfThoughtStep</code>
						for each reasoning step. Each step contains a
						<code class="bg-muted rounded px-1.5 py-0.5">ChainOfThoughtTrigger</code>
						and
						<code class="bg-muted rounded px-1.5 py-0.5">ChainOfThoughtContent</code>.
					</p>
				</div>

				<div>
					<h4 class="text-foreground mb-2 font-semibold">Custom Icons</h4>
					<p>
						Use the <code class="bg-muted rounded px-1.5 py-0.5">leftIcon</code> snippet
						prop on the trigger to add custom icons from
						<code class="bg-muted rounded px-1.5 py-0.5">@lucide/svelte</code>. By
						default, the icon swaps with a chevron on hover, but you can disable this
						with
						<code class="bg-muted rounded px-1.5 py-0.5"
							>swapIconOnHover={"{false}"}</code
						>.
					</p>
				</div>

				<div>
					<h4 class="text-foreground mb-2 font-semibold">Visual Connectors</h4>
					<p>
						The component automatically adds visual connector lines between steps. Set
						<code class="bg-muted rounded px-1.5 py-0.5">isLast={"{true}"}</code>
						on the final step to hide the connector line after it.
					</p>
				</div>

				<div>
					<h4 class="text-foreground mb-2 font-semibold">Rich Content</h4>
					<p>
						You can embed any content inside
						<code class="bg-muted rounded px-1.5 py-0.5">ChainOfThoughtItem</code>,
						including code blocks, images, or other components. This makes it perfect
						for showing complex reasoning with examples.
					</p>
				</div>
			</div>
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
