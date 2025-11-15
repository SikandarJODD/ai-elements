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
	import {
		toolProps,
		toolComposedProps,
		toolHeaderProps,
		toolContentProps,
		toolDetailsProps,
		toolBadgeProps,
		toolPartProps,
		toolStateType,
	} from "./props";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/tool/llms.txt`;
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
			<Subheading class="mb-4 md:text-3xl">Tool</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				Displays tool call details including input, output, status, and errors. Ideal for
				visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="tool"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Tool" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/tool.json`]}
					component="tool"
					registry="prompt-kit"
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Tool -->
			<h3 class="mt-6 mb-3 scroll-m-20 text-lg font-semibold" id="basic-tool">Basic Tool</h3>
			<div data-toc-index={false}>
				<Playground
					code={examples.basic.code}
					component="tool"
					registry="prompt-kit"
					source="example"
				>
					<div class="flex w-full justify-center">
						<examples.basic.Component />
					</div>
				</Playground>
			</div>

			<!-- Example 2: Tool States -->
			<h3 class="mt-8 mb-3 scroll-m-20 text-lg font-semibold" id="tool-states">
				Tool States
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Show different states of tool execution: pending, running, completed, and error.
			</p>
			<div data-toc-index={false}>
				<Playground
					code={examples.states.code}
					component="tool"
					registry="prompt-kit"
					source="example"
				>
					<div class="flex w-full justify-center">
						<examples.states.Component />
					</div>
				</Playground>
			</div>

			<!-- Example 3: Tool States Compact -->
			<h3 class="mt-8 mb-3 scroll-m-20 text-lg font-semibold" id="tool-states-compact">
				Tool States Compact
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A more compact view showing different tool states in a streamlined layout.
			</p>
			<div data-toc-index={false}>
				<Playground
					code={examples.statesCompact.code}
					component="tool"
					registry="prompt-kit"
					source="example"
				>
					<div class="flex w-full justify-center">
						<examples.statesCompact.Component />
					</div>
				</Playground>
			</div>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
				The Tool component is built using shadcn-svelte Collapsible primitives and provides
				both composed and composable patterns.
			</p>

			<!-- ToolComposed -->
			<h3 class="mb-3 text-base font-semibold" id="tool-composed-props">ToolComposed</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				All-in-one component that includes header, content, and details.
			</p>
			<ComponentAPITable
				componentName="ToolComposed"
				props={toolComposedProps}
				class="mb-8"
			/>

			<!-- Tool (Root) -->
			<h3 class="mb-3 text-base font-semibold" id="tool-props">Tool (Root)</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				Root component using Collapsible.Root for composable pattern.
			</p>
			<ComponentAPITable componentName="Tool" props={toolProps} class="mb-8" />

			<!-- ToolHeader -->
			<h3 class="mb-3 text-base font-semibold" id="tool-header-props">ToolHeader</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				Displays tool name, state badge, and collapsible trigger.
			</p>
			<ComponentAPITable componentName="ToolHeader" props={toolHeaderProps} class="mb-8" />

			<!-- ToolContent -->
			<h3 class="mb-3 text-base font-semibold" id="tool-content-props">ToolContent</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				Collapsible content wrapper for tool details.
			</p>
			<ComponentAPITable componentName="ToolContent" props={toolContentProps} class="mb-8" />

			<!-- ToolDetails -->
			<h3 class="mb-3 text-base font-semibold" id="tool-details-props">ToolDetails</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				Displays formatted JSON input/output and error messages.
			</p>
			<ComponentAPITable componentName="ToolDetails" props={toolDetailsProps} class="mb-8" />

			<!-- ToolBadge -->
			<h3 class="mb-3 text-base font-semibold" id="tool-badge-props">ToolBadge</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				State badge component showing tool execution status.
			</p>
			<ComponentAPITable componentName="ToolBadge" props={toolBadgeProps} class="mb-8" />

			<!-- ToolPart Type -->
			<h3 class="mb-3 text-base font-semibold" id="tool-part-type">ToolPart Type</h3>
			<p class="text-muted-foreground mb-3 text-sm">
				TypeScript interface for tool invocation data.
			</p>
			<ComponentAPITable componentName="ToolPart" props={toolPartProps} class="mb-8" />

			<!-- ToolState Type -->
			<h3 class="mb-3 text-base font-semibold" id="tool-state-type">ToolState Type</h3>
			<div class="bg-muted mb-8 rounded-lg p-4">
				<pre class="text-sm"><code>{toolStateType}</code></pre>
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
