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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/markdown/llms.txt`;

	// Component API Props Data
	const markdownProps = [
		{
			name: "content",
			type: "string",
			description: "Markdown content to render",
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
			<Subheading class="mb-4 md:text-3xl">Markdown</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A component for rendering Markdown content with support for GitHub Flavored Markdown
				(GFM) and custom component styling.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Markdown" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/markdown.json`]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Markdown -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-markdown">Basic Markdown</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Render basic Markdown with support for bold, italics, lists, code blocks and more.
			</p>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Markdown with Custom Components -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="markdown-with-custom-components">
				Markdown with Custom Components
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can customize how different Markdown elements are rendered by providing custom
				components.
			</p>
			<Playground code={examples.customComponents.code}>
				<div class="flex w-full justify-center">
					<examples.customComponents.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Markdown -->
			<ComponentAPITable
				componentName="Markdown"
				props={markdownProps}
				class="mt-6"
				id="markdown-props"
			/>

			<!-- Supported Markdown Features Section -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="supported-markdown-features">
				Supported Markdown Features
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The Markdown component uses <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>svelte-streamdown</code
				>
				with <code class="bg-muted rounded px-1.5 py-0.5 text-sm">remark-gfm</code> to support
				GitHub Flavored Markdown, which includes:
			</p>
			<ul
				class="text-muted-foreground mb-6 list-inside list-disc space-y-2 text-sm sm:text-base"
			>
				<li>Tables</li>
				<li>Strikethrough</li>
				<li>Tasklists</li>
				<li>Literal URLs</li>
				<li>Footnotes</li>
			</ul>
			<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
				Additionally, the component includes built-in code block highlighting through syntax
				highlighting support.
			</p>

			<!-- Performance Optimization Section -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="performance-optimization">
				Performance Optimization
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The Markdown component employs advanced memoization techniques to optimize rendering
				performance, especially in streaming AI response scenarios. This approach is crucial
				when rendering chat interfaces where new tokens are continuously streamed.
			</p>

			<h3 class="mt-6 mb-3 text-base font-semibold" id="how-memoization-works">
				How Memoization Works
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Our implementation:
			</p>
			<ol
				class="text-muted-foreground mb-6 ml-4 list-inside list-decimal space-y-2 text-sm sm:text-base"
			>
				<li>Splits Markdown content into discrete semantic blocks</li>
				<li>Memoizes each block individually</li>
				<li>Only re-renders blocks that have actually changed when new content arrives</li>
				<li>
					Preserves already rendered blocks to prevent unnecessary re-parsing and
					re-rendering
				</li>
			</ol>
			<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
				This pattern significantly improves performance in chat applications by preventing
				the entire message history from re-rendering with each new token, which becomes
				increasingly important as conversations grow longer.
			</p>

			<!-- Styling with Tailwind Typography Section -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="styling-with-tailwind-typography">
				Styling with Tailwind Typography
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				For the best typography styling experience, we recommend using the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">@tailwindcss/typography</code
				>
				plugin. This plugin provides a set of
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">prose</code> classes that add beautiful
				typographic defaults to your markdown content.
			</p>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				When using the Markdown component with Tailwind Typography, you can apply the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">prose</code
				> class to get beautiful default styling.
			</p>
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
