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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/loader/llms.txt`;

	// Component API Props Data
	const loaderProps = [
		{
			name: "variant",
			type: '"circular" | "classic" | "pulse" | "pulse-dot" | "dots" | "typing" | "wave" | "bars" | "terminal" | "text-blink" | "text-shimmer" | "loading-dots"',
			default: '"circular"',
			description: "The visual style of the loader",
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			default: '"md"',
			description: "The size of the loader",
		},
		{
			name: "text",
			type: "string",
			description: "Text to display (for supported variants)",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
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
			<Subheading class="mb-4 md:text-3xl">Loader</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A loading component with multiple variants to indicate processing states and provide
				visual feedback to users during wait times.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton
					{llmsTxtUrl}
					component="loader"
					registry="prompt-kit"
					source="documentation"
				/>
				<OpenInMenu componentName="Loader" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/loader.json`]}
					component="loader"
					registry="prompt-kit"
				/>
			</div>

			<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
				<strong>Note:</strong> If you are using Tailwind CSS v4, you may have to grab the keyframes
				and add them to your global.css file manually. Check manual installation for more details.
			</p>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Loader -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-loader">Basic Loader</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Showcasing all available loader variants with default settings.
			</p>
			<Playground
				code={examples.basic.code}
				component="loader"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Loader Sizes -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="loader-sizes">Loader Sizes</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Customize the size of any loader variant with predefined size options.
			</p>
			<Playground
				code={examples.sizes.code}
				component="loader"
				registry="prompt-kit"
				source="example"
			>
				<div class="flex w-full justify-center">
					<examples.sizes.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Loader -->
			<ComponentAPITable
				componentName="Loader"
				props={loaderProps}
				class="mt-6"
				id="loader-props"
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
