<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { Installation, AiInstallCommand } from "$lib/components/docs";
	import Code from "$lib/components/docs/code.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { MetaTags } from "svelte-meta-tags";
	import PromptKitPrevNext from "$lib/components/prompt-kit/prompt-kit-prev-next.svelte";
</script>

<MetaTags
	title="Installation - Prompt Kit"
	description="Learn how to install and set up Prompt Kit components in your SvelteKit project."
	openGraph={{
		title: "Installation - Prompt Kit",
		description:
			"Learn how to install and set up Prompt Kit components in your SvelteKit project.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit/installation",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements - Prompt Kit",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-12 lg:py-12">
	<h1
		class="text-foreground mb-8 text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
	>
		Installation
	</h1>

	<div class="flex max-w-3xl flex-col gap-8">
		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Prerequisites
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Before installing, ensure you have the following:
			</p>

			<ul class="text-muted-foreground ml-6 list-disc space-y-2 text-base leading-7">
				<li>
					<a
						href="https://nodejs.org/en/download/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-foreground underline underline-offset-2">Node.js</a
					> version 18 or later
				</li>
				<li>
					<a
						href="https://svelte.dev/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-foreground underline underline-offset-2">Svelte</a
					> version 5 or later
				</li>
			</ul>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Install shadcn-svelte
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				First, you'll need to install and configure shadcn-svelte in your project. Follow
				the installation guide at <a
					href="https://www.shadcn-svelte.com/docs/installation"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-foreground underline underline-offset-2"
					>shadcn-svelte documentation</a
				>.
			</p>

			<p class="text-muted-foreground text-base leading-7">
				Once shadcn-svelte is set up, you can install svelte prompt-kit components using the
				shadcn CLI.
			</p>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Using the shadcn CLI
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Install components individually using the following format:
			</p>

			<div class="mb-4">
				<Installation
					specifier={`${PUBLIC_WEBSITE_URL}/p/[component-name].json`}
					is_jsrepo={false}
				/>
			</div>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Replace <code class="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
					>[component-name]</code
				> with the name of the component you want to install.
			</p>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Installation Examples
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Here are some examples of installing specific components:
			</p>

			<div class="space-y-6">
				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Prompt Input</h3>
					<AiInstallCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/p/prompt-input.json`,
						]}
					/>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Message</h3>
					<AiInstallCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/p/message.json`,
						]}
					/>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Chain of Thought</h3>
					<AiInstallCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/p/chain-of-thought.json`,
						]}
					/>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Chat Container</h3>
					<AiInstallCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/p/chat-container.json`,
						]}
					/>
				</div>
			</div>
		</section>

		<!-- <section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Available Components
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Svelte Prompt Kit includes 17 components organized into the following categories:
			</p>

			<div class="space-y-6">
				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">
						Input & Interaction (4)
					</h3>
					<ul
						class="text-muted-foreground ml-6 list-disc space-y-1.5 text-base leading-7"
					>
						<li>
							<strong>Prompt Input</strong> - Advanced input with file upload and actions
						</li>
						<li><strong>Prompt Suggestion</strong> - Clickable prompt suggestions</li>
						<li><strong>File Upload</strong> - File attachment with preview</li>
						<li><strong>System Message</strong> - System-level message display</li>
					</ul>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">
						Display Components (5)
					</h3>
					<ul
						class="text-muted-foreground ml-6 list-disc space-y-1.5 text-base leading-7"
					>
						<li><strong>Message</strong> - Chat message with role-based styling</li>
						<li>
							<strong>Code Block</strong> - Syntax-highlighted code with copy button
						</li>
						<li><strong>Markdown</strong> - Rendered markdown content</li>
						<li><strong>Image</strong> - Image display with zoom and download</li>
						<li><strong>Source</strong> - Citation and source links</li>
					</ul>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">AI Features (3)</h3>
					<ul
						class="text-muted-foreground ml-6 list-disc space-y-1.5 text-base leading-7"
					>
						<li><strong>Reasoning</strong> - Collapsible AI reasoning display</li>
						<li><strong>Chain of Thought</strong> - Step-by-step thinking process</li>
						<li><strong>Tool</strong> - Tool call visualization</li>
					</ul>
				</div>

				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Layout & UI (5)</h3>
					<ul
						class="text-muted-foreground ml-6 list-disc space-y-1.5 text-base leading-7"
					>
						<li>
							<strong>Chat Container</strong> - Complete chat layout with scrolling
						</li>
						<li><strong>Scroll Button</strong> - Auto-scroll to bottom button</li>
						<li><strong>Loader</strong> - Loading states and animations</li>
						<li><strong>Steps</strong> - Multi-step process indicator</li>
						<li><strong>Copy Button</strong> - Copy to clipboard with feedback</li>
					</ul>
				</div>
			</div>
		</section> -->

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Usage
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				After installation, import and start using the components in your project. Here are
				some common import patterns:
			</p>

			<div class="space-y-6">
				<div>
					<h3 class="text-foreground mb-3 text-base font-semibold">Basic Example</h3>
					<p class="text-muted-foreground mb-3 text-sm leading-6">
						Here's a simple example combining Message components:
					</p>
					<Code
						lang="svelte"
						code={`
<\script lang="ts"\>
  import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/prompt-kit/message";
<\/script\>

<Message class="justify-start">
  <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
  <MessageContent>
    Hello! How can I help you today?
  </MessageContent>
</Message>`}
					/>
				</div>
			</div>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				LLM-Friendly Documentation
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				For AI assistants and LLMs, we provide a comprehensive llms.txt file with all
				component documentation:
			</p>

			<a
				href="/prompt-kit/llms.txt"
				target="_blank"
				class="bg-muted hover:bg-muted/80 border-border group flex items-center justify-between rounded-lg border p-4 transition-colors"
			>
				<div class="flex items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-muted-foreground h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
						<line x1="16" y1="13" x2="8" y2="13"></line>
						<line x1="16" y1="17" x2="8" y2="17"></line>
						<polyline points="10 9 9 9 8 9"></polyline>
					</svg>
					<div>
						<div class="text-foreground font-medium">llms.txt</div>
						<div class="text-muted-foreground text-sm">
							Complete component documentation for AI assistants
						</div>
					</div>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
					<polyline points="15 3 21 3 21 9"></polyline>
					<line x1="10" y1="14" x2="21" y2="3"></line>
				</svg>
			</a>
		</section>

		<PromptKitPrevNext currentSlug="installation" />
	</div>
</Sidebar.Inset>
