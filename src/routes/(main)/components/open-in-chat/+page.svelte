<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/open-in-chat/llms.txt`;
	// Component API Props Data
	const openInProps = [
		{
			name: "query",
			type: "string",
			description: "The query/prompt text to open in the selected chat provider",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically OpenInTrigger and OpenInContent)",
		},
	];

	const openInTriggerProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the trigger",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom trigger content (defaults to 'Open in chat' button)",
		},
	];

	const openInContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the dropdown content",
		},
		{
			name: "align",
			type: "'start' | 'center' | 'end'",
			default: "'start'",
			description: "Alignment of the dropdown content",
		},
		{
			name: "preventScroll",
			type: "boolean",
			default: "true",
			description: "Whether to prevent scrolling when the dropdown is open",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Dropdown content (typically OpenInItem, OpenInLabel, OpenInSeparator)",
		},
	];

	const openInItemProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the item",
		},
		{
			name: "onclick",
			type: "() => void",
			description: "Click handler for the item",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Item content",
		},
	];

	const openInLabelProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the label",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Label content",
		},
	];

	const openInSeparatorProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the separator",
		},
	];

	const openInChatGPTProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the ChatGPT menu item",
		},
	];

	const openInClaudeProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the Claude menu item",
		},
	];

	const openInV0Props = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the V0 menu item",
		},
	];

	const openInSciraProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the Scira menu item",
		},
	];

	const openInT3Props = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the T3 menu item",
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
			<Subheading class="md:text-3xl">Open In Chat</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Open In Chat</CodeSpan> component provides a dropdown menu that allows
				users to open queries in different AI chat platforms with a single click.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Open In Chat" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/open-in-chat.json`}
				is_jsrepo={true}
				blockname="open-in-chat"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    OpenIn,
    OpenInChatGPT,
    OpenInClaude,
    OpenInContent,
    OpenInScira,
    OpenInT3,
    OpenInTrigger,
    OpenInV0,
  } from "$lib/components/ai-elements/open-in-chat/index.js";
\<\/script\>

<OpenIn query="What is the meaning of life?">
    <OpenInTrigger />
    <OpenInContent>
      <OpenInChatGPT />
      <OpenInClaude />
      <OpenInT3 />
      <OpenInScira />
      <OpenInV0 />
    </OpenInContent>
  </OpenIn>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- OpenIn -->
			<ComponentAPITable
				componentName="OpenIn"
				props={openInProps}
				class="mt-6"
				id="open-in-props"
			/>

			<!-- OpenInTrigger -->
			<ComponentAPITable
				componentName="OpenInTrigger"
				props={openInTriggerProps}
				id="open-in-trigger-props"
			/>

			<!-- OpenInContent -->
			<ComponentAPITable
				componentName="OpenInContent"
				props={openInContentProps}
				id="open-in-content-props"
			/>

			<!-- OpenInItem -->
			<ComponentAPITable
				componentName="OpenInItem"
				props={openInItemProps}
				id="open-in-item-props"
			/>

			<!-- OpenInLabel -->
			<ComponentAPITable
				componentName="OpenInLabel"
				props={openInLabelProps}
				id="open-in-label-props"
			/>

			<!-- OpenInSeparator -->
			<ComponentAPITable
				componentName="OpenInSeparator"
				props={openInSeparatorProps}
				id="open-in-separator-props"
			/>

			<!-- OpenInChatGPT -->
			<ComponentAPITable
				componentName="OpenInChatGPT"
				props={openInChatGPTProps}
				id="open-in-chatgpt-props"
			/>

			<!-- OpenInClaude -->
			<ComponentAPITable
				componentName="OpenInClaude"
				props={openInClaudeProps}
				id="open-in-claude-props"
			/>

			<!-- OpenInV0 -->
			<ComponentAPITable
				componentName="OpenInV0"
				props={openInV0Props}
				id="open-in-v0-props"
			/>

			<!-- OpenInScira -->
			<ComponentAPITable
				componentName="OpenInScira"
				props={openInSciraProps}
				id="open-in-scira-props"
			/>

			<!-- OpenInT3 -->
			<ComponentAPITable
				componentName="OpenInT3"
				props={openInT3Props}
				id="open-in-t3-props"
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
