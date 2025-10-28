<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
	import Playground from "$lib/components/docs/playground.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// Component API Props Data
	const codeBlockProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const codeBlockCodeProps = [
		{
			name: "code",
			type: "string",
			description: "The code to display and highlight",
		},
		{
			name: "language",
			type: "string",
			default: '"tsx"',
			description: "The language for syntax highlighting",
		},
		{
			name: "theme",
			type: "string",
			default: '"github-light"',
			description: "The theme for syntax highlighting",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const codeBlockGroupProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
		},
		{
			name: "class",
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
			<Subheading class="md:text-3xl">Code Block</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				A component for displaying code snippets with syntax highlighting and customizable
				styling using Shiki.
			</p>

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
						`${PUBLIC_WEBSITE_URL}/p/code-block.json`,
					]}
				/>
			</div>

			<!-- Light Mode Note -->
			<div class="bg-muted/50 my-4 rounded-lg border p-3.5">
				<p class="text-muted-foreground text-sm">
					<span class="text-foreground font-medium">💡 Tip:</span> The first three examples
					use the light theme by default. Switch to light mode to view them properly. The "Different
					Themes" example adapts to your current color mode.
				</p>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Code Block -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-code-block">Basic Code Block</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Code Block with Header -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="code-block-with-header">
				Code Block with Header
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can use <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>CodeBlockGroup</code
				> to add a header with metadata and actions to your code blocks.
			</p>
			<Playground code={examples.withHeader.code}>
				<div class="flex w-full justify-center">
					<examples.withHeader.Component />
				</div>
			</Playground>

			<!-- Example 3: Different Languages -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="different-languages">
				Different Languages
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can highlight code in various languages by changing the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">language</code
				> prop.
			</p>

			<!-- Python Example -->
			<h3 class="mt-6 mb-3 text-base font-semibold" id="python-example">Python Example</h3>
			<Playground code={examples.python.code}>
				<div class="flex w-full justify-center">
					<examples.python.Component />
				</div>
			</Playground>

			<!-- CSS Example -->
			<h3 class="mt-6 mb-3 text-base font-semibold" id="css-example">CSS Example</h3>
			<Playground code={examples.css.code}>
				<div class="flex w-full justify-center">
					<examples.css.Component />
				</div>
			</Playground>

			<!-- Example 4: Different Themes -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="different-themes">Different Themes</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Shiki supports many popular themes. This example automatically switches between <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">github-light</code
				>
				and <code class="bg-muted rounded px-1.5 py-0.5 text-sm">github-dark</code> based on
				your current color mode. Try toggling your theme to see the change!
			</p>
			<!-- <div class="mb-4 rounded-lg border bg-muted/50 p-3.5">
        <p class="text-sm text-muted-foreground">
          <span class="font-medium text-foreground">⚠️ Note:</span> You may notice that the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-dark</code> theme doesn't display as expected because styles are being overridden. This happens when using code blocks from both AI Elements and Prompt Kit components on the same page. To avoid style conflicts, prefer using code block components from only one library in your project.
        </p>
      </div> -->
			<Playground code={examples.theme.code}>
				<div class="flex w-full justify-center">
					<examples.theme.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- CodeBlock -->
			<ComponentAPITable
				componentName="CodeBlock"
				props={codeBlockProps}
				class="mt-6"
				id="code-block-props"
			/>

			<!-- CodeBlockCode -->
			<ComponentAPITable
				componentName="CodeBlockCode"
				props={codeBlockCodeProps}
				id="code-block-code-props"
			/>

			<!-- CodeBlockGroup -->
			<ComponentAPITable
				componentName="CodeBlockGroup"
				props={codeBlockGroupProps}
				id="code-block-group-props"
			/>

			<!-- Usage with Markdown Section -->
			<h3 class="mt-8 mb-3 text-xl font-semibold" id="usage-with-markdown">
				Usage with Markdown
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The <code class="bg-muted rounded px-1.5 py-0.5 text-sm">CodeBlock</code> component
				is used internally by the
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">Markdown</code>
				component to render code blocks in markdown content. When used within the Markdown component,
				code blocks are automatically wrapped with the
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">not-prose</code> class to prevent
				conflicts with prose styling.
			</p>

			<!-- Tailwind Typography Section -->
			<h3 class="mt-8 mb-3 text-xl font-semibold" id="tailwind-typography">
				Tailwind Typography and not-prose
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The <code class="bg-muted rounded px-1.5 py-0.5 text-sm">CodeBlock</code> component
				includes the <code class="bg-muted rounded px-1.5 py-0.5 text-sm">not-prose</code>
				class by default to prevent Tailwind Typography's prose styling from affecting code blocks.
				This is important when using the
				<a
					href="https://github.com/tailwindlabs/tailwindcss-typography"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline">@tailwindcss/typography</a
				> plugin, which provides beautiful typography defaults but can interfere with code block
				styling.
			</p>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Since code blocks are styled with Shiki for syntax highlighting, they should not
				inherit Tailwind Typography styles. The <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">not-prose</code
				> class ensures that code blocks maintain their intended appearance regardless of the
				surrounding typography context.
			</p>

			<!-- Customizing Syntax Highlighting Section -->
			<h3 class="mt-8 mb-3 text-xl font-semibold" id="customizing-syntax-highlighting">
				Customizing Syntax Highlighting
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The <code class="bg-muted rounded px-1.5 py-0.5 text-sm">CodeBlockCode</code>
				component uses
				<a
					href="https://shiki.matsu.io/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline">Shiki</a
				>
				for syntax highlighting. You can customize the theme by passing a different theme name
				to the <code class="bg-muted rounded px-1.5 py-0.5 text-sm">theme</code> prop.
			</p>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Shiki supports many popular themes including:
			</p>
			<ul
				class="text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm leading-relaxed sm:text-base"
			>
				<li>
					<code class="bg-muted rounded px-1.5 py-0.5 text-sm">github-light</code> (default)
				</li>
				<li><code class="bg-muted rounded px-1.5 py-0.5 text-sm">github-dark</code></li>
				<li><code class="bg-muted rounded px-1.5 py-0.5 text-sm">dracula</code></li>
				<li><code class="bg-muted rounded px-1.5 py-0.5 text-sm">nord</code></li>
				<li>and more</li>
			</ul>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				For a complete list of supported themes, refer to the <a
					href="https://github.com/shikijs/shiki/blob/main/docs/themes.md"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline">Shiki documentation</a
				>.
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
