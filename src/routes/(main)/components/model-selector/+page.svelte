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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/model-selector/llms.txt`;

	// Component API Props Data
	const modelSelectorProps = [
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state (bindable)",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Selector content (required)",
		},
	];

	const modelSelectorDialogProps = [
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state (bindable)",
		},
		{
			name: "title",
			type: "string",
			default: '"Model Selector"',
			description: "Dialog title",
		},
		{
			name: "description",
			type: "string",
			default: '"Search for a model"',
			description: "Dialog description",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Dialog content (required)",
		},
	];

	const modelSelectorLogoProps = [
		{
			name: "provider",
			type: "string",
			description: 'Provider slug (e.g., "openai", "anthropic")',
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const modelSelectorGroupProps = [
		{
			name: "heading",
			type: "string",
			description: "Group heading text",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Group items (required)",
		},
	];

	const modelSelectorItemProps = [
		{
			name: "value",
			type: "string",
			description: "Item value for search/selection",
		},
		{
			name: "onSelect",
			type: "() => void",
			description: "Callback when item is selected",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Item content (required)",
		},
	];
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Model Selector</Subheading>
			<p class="!text-muted-foreground my-2 text-lg">
				A searchable command palette for selecting AI models in your chat interface.
			</p>

			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="model-selector" {llmsTxtUrl} type="ai-elements" />
			</div>

			<!-- Basic Example -->
			<Subheading>Basic Example</Subheading>

			<Playground code={examples.basic.code}>
				<div class="flex min-h-[200px] items-center justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Installation -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/model-selector.json`}
				is_jsrepo={true}
				blockname="model-selector"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import {
    ModelSelector,
    ModelSelectorContent,
    ModelSelectorEmpty,
    ModelSelectorGroup,
    ModelSelectorInput,
    ModelSelectorItem,
    ModelSelectorList,
    ModelSelectorLogo,
    ModelSelectorLogoGroup,
    ModelSelectorName,
    ModelSelectorTrigger,
  } from "$lib/components/ai-elements/model-selector";
\<\/script\>`}
				/>
			</div>

			<!-- With Dialog -->
			<Subheading>With Dialog</Subheading>

			<p class="text-muted-foreground mb-4">
				Use the standalone dialog variant for a simpler API:
			</p>

			<Playground code={examples.withDialog.code}>
				<div class="flex min-h-[200px] items-center justify-center">
					<examples.withDialog.Component />
				</div>
			</Playground>

			<!-- Component Structure -->
			<Subheading>Component Structure</Subheading>

			<p class="text-muted-foreground mb-4">
				The Model Selector component is composed of several sub-components:
			</p>

			<ul class="text-muted-foreground mb-6 list-inside list-disc space-y-2">
				<li>
					<CodeSpan>ModelSelector</CodeSpan> - Main wrapper with dialog functionality
				</li>
				<li>
					<CodeSpan>ModelSelectorTrigger</CodeSpan> - Trigger button to open the selector
				</li>
				<li>
					<CodeSpan>ModelSelectorContent</CodeSpan> - Dialog content with command palette
				</li>
				<li>
					<CodeSpan>ModelSelectorDialog</CodeSpan> - Standalone dialog variant (combines ModelSelector
					+ Content)
				</li>
				<li><CodeSpan>ModelSelectorInput</CodeSpan> - Search input field</li>
				<li><CodeSpan>ModelSelectorList</CodeSpan> - List container for results</li>
				<li>
					<CodeSpan>ModelSelectorEmpty</CodeSpan> - Empty state when no results found
				</li>
				<li>
					<CodeSpan>ModelSelectorGroup</CodeSpan> - Group models by provider/category
				</li>
				<li><CodeSpan>ModelSelectorItem</CodeSpan> - Individual model item</li>
				<li>
					<CodeSpan>ModelSelectorLogo</CodeSpan> - Provider logo from models.dev
				</li>
				<li>
					<CodeSpan>ModelSelectorLogoGroup</CodeSpan> - Container for multiple provider logos
				</li>
				<li><CodeSpan>ModelSelectorName</CodeSpan> - Model name display</li>
				<li><CodeSpan>ModelSelectorSeparator</CodeSpan> - Visual separator</li>
				<li><CodeSpan>ModelSelectorShortcut</CodeSpan> - Keyboard shortcut display</li>
			</ul>

			<!-- API Reference -->
			<Subheading>API Reference</Subheading>

			<ComponentAPITable componentName="ModelSelector" props={modelSelectorProps} />

			<ComponentAPITable
				componentName="ModelSelectorDialog"
				props={modelSelectorDialogProps}
			/>

			<ComponentAPITable componentName="ModelSelectorLogo" props={modelSelectorLogoProps} />

			<ComponentAPITable componentName="ModelSelectorGroup" props={modelSelectorGroupProps} />

			<ComponentAPITable componentName="ModelSelectorItem" props={modelSelectorItemProps} />

			<!-- Provider Logos -->
			<Subheading>Provider Logos</Subheading>

			<p class="text-muted-foreground mb-4">
				The <CodeSpan>ModelSelectorLogo</CodeSpan> component fetches provider logos from
				<a
					href="https://models.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary underline"
				>
					models.dev
				</a>. Supported providers include:
			</p>

			<ul class="text-muted-foreground mb-6 list-inside list-disc space-y-1">
				<li>OpenAI, Anthropic, Google, Meta (Llama)</li>
				<li>DeepSeek, Mistral, Alibaba, xAI</li>
				<li>Perplexity, Cohere, Amazon Bedrock</li>
				<li>Azure, Groq, Together AI, OpenRouter</li>
				<li>And 50+ more providers</li>
			</ul>

			<!-- Notes -->
			<Subheading>Notes</Subheading>

			<ul class="text-muted-foreground mb-6 list-inside list-disc space-y-2">
				<li>Built on top of shadcn-svelte's Dialog and Command components.</li>
				<li>Fully searchable with fuzzy matching.</li>
				<li>Keyboard navigation support (arrow keys, enter, escape).</li>
				<li>Accessible with proper ARIA labels.</li>
				<li>Provider logos are automatically loaded from models.dev CDN.</li>
				<li>
					Perfect for AI chat applications, model comparison tools, and API playgrounds.
				</li>
			</ul>

			<AiElementsPrevNext currentSlug="model-selector" />
		</main>

		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
