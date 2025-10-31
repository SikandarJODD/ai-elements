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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/file-upload/llms.txt`;

	// Component API Props Data
	const fileUploadProps = [
		{
			name: "onFilesAdded",
			type: "(files: File[]) => void",
			description: "Function called when files are added",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components",
		},
		{
			name: "multiple",
			type: "boolean",
			default: "true",
			description: "Allow selection of multiple files",
		},
		{
			name: "accept",
			type: "string",
			description: 'File types to accept (e.g., ".jpg,.png")',
		},
	];

	const fileUploadTriggerProps = [
		{
			name: "asChild",
			type: "boolean",
			default: "false",
			description: "Use child element as the trigger",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLButtonElement>",
			description: "All other button props",
		},
	];

	const fileUploadContentProps = [
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props",
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
			<Subheading class="mb-4 md:text-3xl">File Upload</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A component for creating drag-and-drop file upload interfaces with support for
				single or multiple files, custom triggers, and visual feedback during file dragging
				operations.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="File Upload" {llmsTxtUrl} />
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
						`${PUBLIC_WEBSITE_URL}/p/file-upload.json`,
					]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: File Upload with Prompt Input -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="file-upload-with-prompt-input">
				File Upload with Prompt Input
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can combine the file upload component with the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">Prompt Input</code
				> component to create a full-featured input component with file upload support. You can
				try to drop a file to see the visual feedback.
			</p>
			<Playground code={examples.withPromptInput.code}>
				<div class="flex w-full justify-center">
					<examples.withPromptInput.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- FileUpload -->
			<ComponentAPITable
				componentName="FileUpload"
				props={fileUploadProps}
				class="mt-6"
				id="file-upload-props"
			/>

			<!-- FileUploadTrigger -->
			<ComponentAPITable
				componentName="FileUploadTrigger"
				props={fileUploadTriggerProps}
				id="file-upload-trigger-props"
			/>

			<!-- FileUploadContent -->
			<ComponentAPITable
				componentName="FileUploadContent"
				props={fileUploadContentProps}
				id="file-upload-content-props"
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
