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
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/context/llms.txt`;
	// Component API Props Data
	const contextProps = [
		{
			name: "usedTokens",
			type: "number",
			description: "Number of tokens currently used",
		},
		{
			name: "maxTokens",
			type: "number",
			description: "Maximum number of tokens allowed",
		},
		{
			name: "usage",
			type: "LanguageModelUsage",
			description: "Detailed token usage breakdown (input, output, reasoning, cached)",
		},
		{
			name: "modelId",
			type: "string",
			description: "Model identifier for cost estimation",
		},
		{
			name: "closeDelay",
			type: "number",
			default: "0",
			description: "Delay in milliseconds before closing the hover card",
		},
		{
			name: "openDelay",
			type: "number",
			default: "0",
			description: "Delay in milliseconds before opening the hover card",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically ContextTrigger and ContextContent)",
		},
	];

	const contextTriggerProps = [
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Button variant style",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			description: "Button size",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom trigger content (defaults to percentage display with icon)",
		},
	];

	const contextContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Content to display in the hover card (typically header, body, footer)",
		},
	];

	const contextContentHeaderProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the header",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom header content (defaults to percentage and token count display)",
		},
	];

	const contextContentBodyProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the body",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Body content (typically usage breakdown components)",
		},
	];

	const contextContentFooterProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the footer",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom footer content (defaults to total cost display)",
		},
	];

	const contextInputUsageProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the input usage display",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content for input token usage display",
		},
	];

	const contextOutputUsageProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the output usage display",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content for output token usage display",
		},
	];

	const contextReasoningUsageProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the reasoning usage display",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content for reasoning token usage display",
		},
	];

	const contextCacheUsageProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the cache usage display",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content for cache token usage display",
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
			<Subheading class="md:text-3xl">Context</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Context</CodeSpan> component provides a comprehensive view of AI model
				usage through a compound component system. It displays context window utilization, token
				consumption breakdown (input, output, reasoning, cache), and cost estimation in an interactive
				hover card interface.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Context" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/context.json`}
				is_jsrepo={true}
				blockname="context"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    Context,
    ContextCacheUsage,
    ContextContent,
    ContextContentBody,
    ContextContentFooter,
    ContextContentHeader,
    ContextInputUsage,
    ContextOutputUsage,
    ContextReasoningUsage,
    ContextTrigger,
  } from "$lib/components/ai-elements/context/index.js";
\<\/script\>

<Context
    maxTokens={128_000}
    modelId="openai:gpt-5"
    usage={{
      inputTokens: 32_000,
      outputTokens: 8000,
      cachedInputTokens: 0,
      reasoningTokens: 0,
    }}
    usedTokens={40_000}
  >
    <ContextTrigger />
    <ContextContent>
      <ContextContentHeader />
      <ContextContentBody>
        <ContextInputUsage />
        <ContextOutputUsage />
        <ContextReasoningUsage />
        <ContextCacheUsage />
      </ContextContentBody>
      <ContextContentFooter />
    </ContextContent>
  </Context>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Context -->
			<ComponentAPITable
				componentName="Context"
				props={contextProps}
				class="mt-6"
				id="context-props"
			/>

			<!-- ContextTrigger -->
			<ComponentAPITable
				componentName="ContextTrigger"
				props={contextTriggerProps}
				id="context-trigger-props"
			/>

			<!-- ContextContent -->
			<ComponentAPITable
				componentName="ContextContent"
				props={contextContentProps}
				id="context-content-props"
			/>

			<!-- ContextContentHeader -->
			<ComponentAPITable
				componentName="ContextContentHeader"
				props={contextContentHeaderProps}
				id="context-content-header-props"
			/>

			<!-- ContextContentBody -->
			<ComponentAPITable
				componentName="ContextContentBody"
				props={contextContentBodyProps}
				id="context-content-body-props"
			/>

			<!-- ContextContentFooter -->
			<ComponentAPITable
				componentName="ContextContentFooter"
				props={contextContentFooterProps}
				id="context-content-footer-props"
			/>

			<!-- ContextInputUsage -->
			<ComponentAPITable
				componentName="ContextInputUsage"
				props={contextInputUsageProps}
				id="context-input-usage-props"
			/>

			<!-- ContextOutputUsage -->
			<ComponentAPITable
				componentName="ContextOutputUsage"
				props={contextOutputUsageProps}
				id="context-output-usage-props"
			/>

			<!-- ContextReasoningUsage -->
			<ComponentAPITable
				componentName="ContextReasoningUsage"
				props={contextReasoningUsageProps}
				id="context-reasoning-usage-props"
			/>

			<!-- ContextCacheUsage -->
			<ComponentAPITable
				componentName="ContextCacheUsage"
				props={contextCacheUsageProps}
				id="context-cache-usage-props"
			/>

			<AiElementsPrevNext currentSlug="context" />
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
