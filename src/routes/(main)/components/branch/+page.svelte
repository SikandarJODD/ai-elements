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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/branch/llms.txt`;
	// Component API Props Data
	const branchProps = [
		{
			name: "defaultBranch",
			type: "number",
			default: "0",
			description: "The index of the branch to display by default",
		},
		{
			name: "onBranchChange",
			type: "(branchIndex: number) => void",
			description: "Callback function called when the branch changes",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the branch container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically BranchMessages and BranchSelector)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const branchMessagesProps = [
		{
			name: "children",
			type: "Snippet[]",
			description: "Array of message snippets representing different branches",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the messages container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const branchSelectorProps = [
		{
			name: "from",
			type: "'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'",
			description: "The message sender type (determines alignment of the selector)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the selector container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically BranchPrevious, BranchPage, BranchNext)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const branchPreviousProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the previous button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render instead of the default chevron icon",
		},
		{
			name: "...restProps",
			type: "ButtonProps",
			description: "All other Button component props are supported",
		},
	];

	const branchNextProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the next button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render instead of the default chevron icon",
		},
		{
			name: "...restProps",
			type: "ButtonProps",
			description: "All other Button component props are supported",
		},
	];

	const branchPageProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the page indicator",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLSpanElement>",
			description: "All other span props are supported",
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
			<Subheading class="md:text-3xl">Branch</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Branch</CodeSpan> component manages multiple versions of AI messages, allowing
				users to navigate between different response branches. It provides a clean, modern interface
				with customizable themes and keyboard-accessible navigation buttons.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Branch" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`}
				is_jsrepo={true}
				blockname="branch"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
		Branch,
		BranchMessages,
		BranchNext,
		BranchPage,
		BranchPrevious,
		BranchSelector
	} from '$lib/components/ai-elements/branch/index.js';
\<\/script\>

<Branch defaultBranch={0}>
  <BranchMessages>
    <Message from="user">
      <MessageContent>Hello</MessageContent>
    </Message>
    <Message from="user">
      <MessageContent>Hi!</MessageContent>
    </Message>
  </BranchMessages>
  <BranchSelector from="user">
    <BranchPrevious />
    <BranchPage />
    <BranchNext />
  </BranchSelector>
</Branch>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Branch -->
			<ComponentAPITable
				componentName="Branch"
				props={branchProps}
				class="mt-6"
				id="branch-props"
			/>

			<!-- BranchMessages -->
			<ComponentAPITable
				componentName="BranchMessages"
				props={branchMessagesProps}
				id="branch-messages-props"
			/>

			<!-- BranchSelector -->
			<ComponentAPITable
				componentName="BranchSelector"
				props={branchSelectorProps}
				id="branch-selector-props"
			/>

			<!-- BranchPrevious -->
			<ComponentAPITable
				componentName="BranchPrevious"
				props={branchPreviousProps}
				id="branch-previous-props"
			/>

			<!-- BranchNext -->
			<ComponentAPITable
				componentName="BranchNext"
				props={branchNextProps}
				id="branch-next-props"
			/>

			<!-- BranchPage -->
			<ComponentAPITable
				componentName="BranchPage"
				props={branchPageProps}
				id="branch-page-props"
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
