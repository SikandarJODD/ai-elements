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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/image/llms.txt`;

	// Component API Props Data
	const imageProps = [
		{
			name: "base64",
			type: "string",
			description: "Base64-encoded image data",
		},
		{
			name: "uint8Array",
			type: "Uint8Array",
			description: "Raw image data as Uint8Array",
		},
		{
			name: "mediaType",
			type: "string",
			default: "'image/png'",
			description: "MIME type of the image (e.g., 'image/jpeg')",
		},
		{
			name: "alt",
			type: "string",
			description: "Alternative text for accessibility (required)",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "ImgHTMLAttributes<HTMLImageElement>",
			description: "All standard HTML <img> attributes",
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
			<Subheading class="mb-4 md:text-3xl">Image</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				The <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Image</code> component displays
				images from base64 or Uint8Array data, supporting all standard HTML image attributes.
				It is ideal for showing AI-generated images or user uploads in chat and AI apps. Compatible
				with AI SDK v5 architecture.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Image" {llmsTxtUrl} />
			</div>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/image.json`]}
				/>
			</div>

			<!-- Features Section -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="features">Features</h3>
			<ul
				class="text-muted-foreground mb-6 list-inside list-disc space-y-2 text-sm sm:text-base"
			>
				<li>Accepts base64 or Uint8Array image data</li>
				<li>Supports all standard HTML image attributes</li>
				<li>
					Responsive by default with <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
						>max-w-full h-auto</code
					>
				</li>
				<li>Customizable with Tailwind classes</li>
				<li>Fully accessible (alt required)</li>
			</ul>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Usage -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-usage">Basic Usage</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Image -->
			<ComponentAPITable
				componentName="Image"
				props={imageProps}
				class="mt-6"
				id="image-props"
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
