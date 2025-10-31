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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/chat-container/llms.txt`;

	// Component API Props Data
	const chatContainerRootProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render inside the container",
		},
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

	const chatContainerContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child components to render inside the content container",
		},
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

	const chatContainerScrollAnchorProps = [
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
			<Subheading class="mb-4 md:text-3xl">Chat Container</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
				A component for creating chat interfaces with intelligent auto-scrolling behavior,
				designed to provide a smooth experience in conversation interfaces.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Chat Container" {llmsTxtUrl} />
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
						`${PUBLIC_WEBSITE_URL}/p/chat-container.json`,
					]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Chat Container Basic -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="chat-container-basic">
				Chat Container Basic
			</h3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Streaming Text Example -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="streaming-text-example">
				Streaming Text Example
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A chat container that demonstrates text streaming with automatic scrolling. Click
				the "Show Streaming" button to see a simulated streaming response with the smart
				auto-scroll behavior in action.
			</p>
			<Playground code={examples.streaming.code}>
				<div class="flex w-full justify-center">
					<examples.streaming.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
				The ChatContainer is built using three separate components that work together:
			</p>

			<!-- ChatContainerRoot -->
			<h3 class="mt-6 mb-3 text-base font-semibold" id="chat-container-root">
				ChatContainerRoot
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The main container that provides auto-scrolling functionality using the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">use-stick-to-bottom</code
				> library.
			</p>
			<ComponentAPITable
				componentName="ChatContainerRoot"
				props={chatContainerRootProps}
				class="mt-4"
				id="chat-container-root-props"
			/>

			<!-- ChatContainerContent -->
			<h3 class="mt-6 mb-3 text-base font-semibold" id="chat-container-content">
				ChatContainerContent
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The content wrapper that should contain your messages.
			</p>
			<ComponentAPITable
				componentName="ChatContainerContent"
				props={chatContainerContentProps}
				id="chat-container-content-props"
			/>

			<!-- ChatContainerScrollAnchor -->
			<h3 class="mt-6 mb-3 text-base font-semibold" id="chat-container-scroll-anchor">
				ChatContainerScrollAnchor
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				An optional scroll anchor element that can be used for scroll targeting.
			</p>
			<ComponentAPITable
				componentName="ChatContainerScrollAnchor"
				props={chatContainerScrollAnchorProps}
				id="chat-container-scroll-anchor-props"
			/>

			<!-- Auto-Scroll Behavior Section -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="auto-scroll-behavior">
				Auto-Scroll Behavior
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The component uses the <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
					>use-stick-to-bottom</code
				> library to provide sophisticated auto-scrolling:
			</p>
			<ul
				class="text-muted-foreground mb-6 ml-4 list-inside list-disc space-y-2 text-sm sm:text-base"
			>
				<li>
					<strong>Smooth Animations:</strong> Uses velocity-based spring animations for natural
					scrolling
				</li>
				<li>
					<strong>Content Resizing:</strong> Automatically detects content changes using ResizeObserver
					API
				</li>
				<li>
					<strong>User Control:</strong> Automatically disables sticky behavior when users
					scroll up
				</li>
				<li><strong>Mobile Support:</strong> Works seamlessly on touch devices</li>
				<li>
					<strong>Performance:</strong> Zero dependencies and optimized for chat applications
				</li>
				<li>
					<strong>Scroll Anchoring:</strong> Prevents content jumping when new content is added
					above the viewport
				</li>
			</ul>

			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Key behaviors:
			</p>
			<ul
				class="text-muted-foreground mb-6 ml-4 list-inside list-disc space-y-2 text-sm sm:text-base"
			>
				<li>
					<strong>Stick to Bottom:</strong> Automatically scrolls to bottom when new content
					is added (if already at bottom)
				</li>
				<li>
					<strong>Smart Scrolling:</strong> Only scrolls when user is at the bottom, preserves
					scroll position otherwise
				</li>
				<li>
					<strong>Cancel on Scroll:</strong> User can scroll up to cancel auto-scrolling behavior
				</li>
				<li>
					<strong>Resume Auto-Scroll:</strong> Returns to auto-scrolling when user scrolls
					back to bottom
				</li>
			</ul>

			<!-- Using with ScrollButton Section -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="using-with-scroll-button">
				Using with ScrollButton
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				The ChatContainer pairs perfectly with the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">ScrollButton</code
				> component. The ScrollButton automatically appears when the user scrolls up and disappears
				when at the bottom.
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
