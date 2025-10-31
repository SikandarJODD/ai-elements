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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/tool/llms.txt`;

	// Component API Props Data
	const toolProps = [
		{
			name: "toolPart",
			type: "ToolPart",
			description: "The tool invocation data to display",
		},
		{
			name: "defaultOpen",
			type: "boolean",
			default: "false",
			description: "Whether the tool details are expanded by default",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const toolPartProps = [
		{
			name: "type",
			type: "string",
			description: "The type of the tool",
		},
		{
			name: "state",
			type: "string",
			description:
				"The state of the tool (input-streaming, input-available, output-available, output-error)",
		},
		{
			name: "input",
			type: "Record<string, unknown>",
			description: "The input data to the tool",
		},
		{
			name: "output",
			type: "Record<string, unknown>",
			description: "The output data from the tool",
		},
		{
			name: "toolCallId",
			type: "string",
			description: "The tool call identifier",
		},
		{
			name: "errorText",
			type: "string",
			description: "The error text if the tool failed to execute",
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
			<Subheading class="mb-4 md:text-3xl">Tool</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				Displays tool call details including input, output, status, and errors. Ideal for
				visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
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
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Tool -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-tool">Basic Tool</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Tool States -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="tool-states">Tool States</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Show different states of tool execution: pending, running, completed, and error.
			</p>
			<Playground code={examples.states.code}>
				<div class="flex w-full justify-center">
					<examples.states.Component />
				</div>
			</Playground>

			<!-- Example 3: Tool States Compact -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="tool-states-compact">
				Tool States Compact
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A more compact view showing different tool states in a streamlined layout.
			</p>
			<Playground code={examples.statesCompact.code}>
				<div class="flex w-full justify-center">
					<examples.statesCompact.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Tool -->
			<ComponentAPITable
				componentName="Tool"
				props={toolProps}
				class="mt-6"
				id="tool-props"
			/>

			<!-- ToolPart -->
			<ComponentAPITable
				componentName="ToolPart"
				props={toolPartProps}
				id="tool-part-props"
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
