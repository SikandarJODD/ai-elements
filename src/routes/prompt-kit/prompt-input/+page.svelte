<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		AiInstallCommand,
		ComponentAPITable,
		H3,
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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/prompt-input/llms.txt`;

	// Component API Props Data
	const promptInputProps = [
		{
			name: "isLoading",
			type: "boolean",
			default: "false",
			description: "Loading state of the input",
		},
		{
			name: "value",
			type: "string",
			default: '""',
			description: "Controlled value of the input",
		},
		{
			name: "onValueChange",
			type: "(value: string) => void",
			description: "Callback when input value changes",
		},
		{
			name: "maxHeight",
			type: "number | string",
			default: "240",
			description: "Maximum height of the textarea in pixels",
		},
		{
			name: "onSubmit",
			type: "() => void",
			description: "Callback when form is submitted (Enter pressed)",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const promptInputTextareaProps = [
		{
			name: "disableAutosize",
			type: "boolean",
			default: "false",
			description: "Disable automatic height adjustment",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "onKeyDown",
			type: "(e: KeyboardEvent) => void",
			description: "Keyboard event handler",
		},
		{
			name: "disabled",
			type: "boolean",
			default: "false",
			description: "Disable the textarea input",
		},
		{
			name: "...props",
			type: "HTMLTextareaAttributes",
			description: "All other textarea props are supported",
		},
	];

	const promptInputActionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
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

	const promptInputActionProps = [
		{
			name: "tooltip",
			type: "Snippet",
			description: "Content to show in the tooltip",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child component to trigger the tooltip",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes for the tooltip",
		},
		{
			name: "side",
			type: '"top" | "bottom" | "left" | "right"',
			default: '"top"',
			description: "Position of the tooltip relative to the trigger",
		},
		{
			name: "disabled",
			type: "boolean",
			default: "false",
			description: "Disable the tooltip trigger",
		},
		{
			name: "...props",
			type: "TooltipProps",
			description: "All other Tooltip component props are supported",
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
			<Subheading class="mb-4 md:text-3xl">Prompt Input</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				An input field that allows users to enter and submit text to an AI model.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="prompt-input"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Prompt Input" {llmsTxtUrl} />
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
						`${PUBLIC_WEBSITE_URL}/p/prompt-input.json`,
					]}
					component="prompt-input"
					registry="prompt-kit"
				/>
			</div>
			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Prompt Input basic -->
			<H3>Prompt Input basic</H3>
			<Playground
				code={examples.basic.code}
				component="prompt-input"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>
			<!-- Example 2: Prompt Input with actions -->
			<H3 class="mt-8">Prompt Input with actions</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can use <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>PromptInputActions</code
				>
				to add actions with tooltips to the
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">PromptInput</code>.
			</p>
			<Playground
				code={examples.withActions.code}
				component="prompt-input"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.withActions.Component />
				</div>
			</Playground>
			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- PromptInput -->
			<ComponentAPITable
				componentName="PromptInput"
				props={promptInputProps}
				class="mt-6"
				id="promptinput"
			/>

			<!-- PromptInputTextarea -->
			<ComponentAPITable
				componentName="PromptInputTextarea"
				props={promptInputTextareaProps}
				id="promptinputtextarea"
			/>

			<!-- PromptInputActions -->
			<ComponentAPITable
				componentName="PromptInputActions"
				props={promptInputActionsProps}
				id="promptinputactions"
			/>

			<!-- PromptInputAction -->
			<ComponentAPITable
				componentName="PromptInputAction"
				props={promptInputActionProps}
				id="promptinputaction"
			/>

			<PromptKitPrevNext currentSlug="prompt-input" />
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<H3 class="mt-0 mb-4 text-sm">On this page</H3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
