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
	const messageProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
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

	const messageAvatarProps = [
		{
			name: "src",
			type: "string",
			description: "URL of the avatar image",
		},
		{
			name: "alt",
			type: "string",
			description: "Alt text for the avatar image",
		},
		{
			name: "fallback",
			type: "string",
			description: "Text to display if image fails to load",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const messageContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to display in the message",
		},
		{
			name: "markdown",
			type: "boolean",
			default: "false",
			description: "Whether to render content as markdown",
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

	const messageActionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render",
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

	const messageActionProps = [
		{
			name: "tooltip",
			type: "Snippet",
			description: "Content to show in the tooltip",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child component to trigger the tooltip",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes for the tooltip",
		},
		{
			name: "side",
			type: '"top" | "bottom" | "left" | "right"',
			default: '"top"',
			description: "Position of the tooltip relative to the trigger",
		},
		{
			name: "...props",
			type: "TooltipProps",
			description: "All other Tooltip component props are supported",
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
			<Subheading class="md:text-3xl">Message</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				A component for displaying messages in a conversation interface, with support for
				avatars, markdown content, and interactive actions.
			</p>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/message.json`]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic Message -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-message">Basic Message</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Message with Markdown -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="message-with-markdown">
				Message with Markdown
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The <code class="bg-muted rounded px-1.5 py-0.5 text-sm">markdown</code> prop enables
				rendering content as Markdown, perfect for rich text formatting in messages.
			</p>
			<Playground code={examples.markdown.code}>
				<div class="flex w-full justify-center">
					<examples.markdown.Component />
				</div>
			</Playground>

			<!-- Example 3: Message with Actions -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="message-with-actions">
				Message with Actions
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				You can use <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>MessageActions</code
				>
				and <code class="bg-muted rounded px-1.5 py-0.5 text-sm">MessageAction</code> to add
				interactive elements to your messages.
			</p>
			<Playground code={examples.withActions.code}>
				<div class="flex w-full justify-center">
					<examples.withActions.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- Message -->
			<ComponentAPITable
				componentName="Message"
				props={messageProps}
				class="mt-6"
				id="message-props"
			/>

			<!-- MessageAvatar -->
			<ComponentAPITable
				componentName="MessageAvatar"
				props={messageAvatarProps}
				id="message-avatar-props"
			/>

			<!-- MessageContent -->
			<ComponentAPITable
				componentName="MessageContent"
				props={messageContentProps}
				id="message-content-props"
			/>

			<!-- MessageActions -->
			<ComponentAPITable
				componentName="MessageActions"
				props={messageActionsProps}
				id="message-actions-props"
			/>

			<!-- MessageAction -->
			<ComponentAPITable
				componentName="MessageAction"
				props={messageActionProps}
				id="message-action-props"
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
