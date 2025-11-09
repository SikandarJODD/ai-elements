<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		H3,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/plan/llms.txt`;

	// Component API Props Data
	const planProps = [
		{
			name: "isStreaming",
			type: "boolean",
			default: "false",
			description: "Whether the plan is in streaming state (shows shimmer effect)",
		},
		{
			name: "defaultOpen",
			type: "boolean",
			default: "false",
			description: "Whether the plan is expanded by default",
		},
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state",
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Callback when open state changes",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply",
		},
		{
			name: "children",
			type: "Snippet",
			required: true,
			description: "Plan content (PlanHeader, PlanContent, PlanFooter)",
		},
	];

	const planTitleProps = [
		{
			name: "children",
			type: "Snippet",
			required: true,
			description:
				"Title content (automatically gets shimmer effect when isStreaming is true)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply",
		},
	];

	const planDescriptionProps = [
		{
			name: "children",
			type: "Snippet",
			required: true,
			description:
				"Description content (automatically gets shimmer effect when isStreaming is true)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply",
		},
	];

	const planContentProps = [
		{
			name: "children",
			type: "Snippet",
			required: true,
			description: "Collapsible content",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply",
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
			<Subheading class="md:text-3xl">Plan</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				A collapsible plan component for displaying AI-generated execution plans with
				streaming support and shimmer animations.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Plan" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code} class="flex items-start justify-start">
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/plan.json`}
				is_jsrepo={true}
				blockname="plan"
			/>

			<!-- Examples Section -->
			<!-- <Subheading>Examples</Subheading> -->

			<!-- Basic Example -->
			<!-- <H3>Basic Plan</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				A simple collapsible plan with title, description, and content. This example is from
				the official Vercel AI Elements documentation.
			</p>
			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<H3>Plan</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				The main wrapper component that provides context and collapsible functionality.
			</p>
			<ComponentAPITable componentName="Plan" props={planProps} />

			<H3>PlanTitle</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				Displays the plan title with automatic shimmer effect during streaming.
			</p>
			<ComponentAPITable componentName="PlanTitle" props={planTitleProps} />

			<H3>PlanDescription</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				Displays the plan description with automatic shimmer effect during streaming.
			</p>
			<ComponentAPITable componentName="PlanDescription" props={planDescriptionProps} />

			<H3>PlanContent</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				The collapsible content area for plan details.
			</p>
			<ComponentAPITable componentName="PlanContent" props={planContentProps} />

			<H3>Other Components</H3>
			<p class="text-muted-foreground mb-4 text-sm">
				Additional components for plan structure:
			</p>
			<ul class="text-muted-foreground mb-4 list-inside list-disc space-y-2.5 text-sm">
				<li>
					<CodeSpan>PlanHeader</CodeSpan> - Header section containing title, description, and
					trigger
				</li>
				<li>
					<CodeSpan>PlanAction</CodeSpan> - Wrapper for action elements (trigger, buttons)
				</li>
				<li>
					<CodeSpan>PlanTrigger</CodeSpan> - Toggle button with chevron icon to expand/collapse
				</li>
				<li><CodeSpan>PlanFooter</CodeSpan> - Footer section for additional actions</li>
			</ul>

			<!-- Notes Section -->
			<Subheading>Notes</Subheading>
			<ul class="text-muted-foreground mb-4 list-inside list-disc space-y-2 text-sm">
				<li>
					The <CodeSpan>isStreaming</CodeSpan> prop automatically applies shimmer effects to
					<CodeSpan>PlanTitle</CodeSpan> and <CodeSpan>PlanDescription</CodeSpan> components.
				</li>
				<li>
					Built on top of shadcn-svelte's <CodeSpan>Card</CodeSpan>, <CodeSpan
						>Button</CodeSpan
					>, and <CodeSpan>Collapsible</CodeSpan> components.
				</li>
				<li>
					Uses the <CodeSpan>Shimmer</CodeSpan> component internally for streaming animations.
				</li>
				<li>
					Fully accessible with proper ARIA labels and keyboard navigation support via the
					underlying Collapsible component.
				</li>
				<li>
					Perfect for displaying AI-generated execution plans, task breakdowns, and
					multi-step processes.
				</li>
			</ul>
		</main>

		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
