<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, ComponentAPITable } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import Heading from "$lib/components/docs/heading.svelte";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// Component API Props Data
	const artifactProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const artifactHeaderProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render (typically title, description, and actions)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the header",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const artifactTitleProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Title text content",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the title",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLParagraphElement>",
			description: "All other paragraph props are supported",
		},
	];

	const artifactDescriptionProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Description text content",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the description",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLParagraphElement>",
			description: "All other paragraph props are supported",
		},
	];

	const artifactActionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child ArtifactAction components to render",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the actions container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const artifactActionProps = [
		{
			name: "tooltip",
			type: "string",
			description: "Tooltip text to display on hover",
		},
		{
			name: "label",
			type: "string",
			description:
				"Accessible label for screen readers (falls back to tooltip if not provided)",
		},
		{
			name: "icon",
			type: "typeof Icon",
			description: "Lucide icon component to render",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render (used if icon is not provided)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Size of the button",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes | HTMLAnchorAttributes",
			description: "All other button/anchor props are supported",
		},
	];

	const artifactCloseProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Custom close icon (defaults to X icon if not provided)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Size of the button",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes | HTMLAnchorAttributes",
			description: "All other button/anchor props are supported",
		},
	];

	const artifactContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to render inside the artifact",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "...restProps",
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
			<Subheading class="md:text-3xl">Artifact</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Artifact</CodeSpan> component provides a structured container for displaying
				generated content like code, documents, or other outputs with built-in header actions.
			</p>

			<Playground code={examples.basic.code}>
				<div class="mx-auto w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/artifact.json`}
				is_jsrepo={true}
				blockname="artifact"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	 import {
    Artifact,
    ArtifactAction,
    ArtifactActions,
    ArtifactContent,
    ArtifactDescription,
    ArtifactHeader,
    ArtifactTitle,
  } from "$lib/components/ai-elements/artifact/index.js";
\<\/script\>

<Artifact>
  <ArtifactHeader>
    <div>
      <ArtifactTitle>Dijkstra's Algorithm Implementation</ArtifactTitle>
      <ArtifactDescription>Updated 1 minute ago</ArtifactDescription>
    </div>
    <ArtifactActions>
      <ArtifactAction icon={CopyIcon} label="Copy" tooltip="Copy to clipboard" />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    {/* Your content here */}
  </ArtifactContent>
</Artifact>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Artifact -->
			<ComponentAPITable
				componentName="Artifact"
				props={artifactProps}
				class="mt-6"
				id="artifact-props"
			/>

			<!-- ArtifactHeader -->
			<ComponentAPITable
				componentName="ArtifactHeader"
				props={artifactHeaderProps}
				id="artifact-header-props"
			/>

			<!-- ArtifactTitle -->
			<ComponentAPITable
				componentName="ArtifactTitle"
				props={artifactTitleProps}
				id="artifact-title-props"
			/>

			<!-- ArtifactDescription -->
			<ComponentAPITable
				componentName="ArtifactDescription"
				props={artifactDescriptionProps}
				id="artifact-description-props"
			/>

			<!-- ArtifactActions -->
			<ComponentAPITable
				componentName="ArtifactActions"
				props={artifactActionsProps}
				id="artifact-actions-props"
			/>

			<!-- ArtifactAction -->
			<ComponentAPITable
				componentName="ArtifactAction"
				props={artifactActionProps}
				id="artifact-action-props"
			/>

			<!-- ArtifactClose -->
			<ComponentAPITable
				componentName="ArtifactClose"
				props={artifactCloseProps}
				id="artifact-close-props"
			/>

			<!-- ArtifactContent -->
			<ComponentAPITable
				componentName="ArtifactContent"
				props={artifactContentProps}
				id="artifact-content-props"
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
