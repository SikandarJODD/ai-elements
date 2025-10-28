<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import InfoIcon from "@lucide/svelte/icons/info";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import RocketIcon from "@lucide/svelte/icons/rocket";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import ComponentIcon from "@lucide/svelte/icons/component";
	import {
		CodeNameBlock,
		CodeSpan,
		AiInstallCommand,
		Installation,
		Subheading,
	} from "$lib/components/docs";
	import { Card } from "$lib/components/ui/card";
	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import { Button } from "$lib/components/ui/button/index.js";

	let toc = new UseToc();
</script>

<MetaTags
	title="Basic Setup Guide - Svelte AI Elements Getting Started"
	description="Complete setup guide for Svelte AI Elements. Learn how to install Svelte, configure shadcn-svelte, set up OpenRouter API, and integrate AI SDK for building intelligent applications. Step-by-step tutorial for beginners."
	keywords={[
		"Svelte setup",
		"AI Elements setup",
		"SvelteKit installation",
		"shadcn-svelte setup",
		"OpenRouter API setup",
		"AI SDK installation",
		"Svelte AI tutorial",
		"getting started Svelte AI",
		"Svelte AI Elements guide",
		"AI chatbot setup",
		"Vercel AI SDK Svelte",
		"TypeScript Svelte setup",
		"Tailwind CSS Svelte",
		"Svelte project setup",
		"AI development setup",
	]}
	canonical="https://svelte-ai-elements.vercel.app/guides/basic-setup"
	openGraph={{
		type: "article",
		title: "Basic Setup Guide - Svelte AI Elements",
		description:
			"Complete setup guide for building AI-powered Svelte applications. Install Svelte, configure UI components, and integrate AI models in 10 minutes.",
		url: "https://svelte-ai-elements.vercel.app/guides/basic-setup",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/blog-og.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements Basic Setup Guide",
				type: "image/png",
			},
		],
	}}
	twitter={{
		cardType: "summary_large_image",
		title: "Basic Setup Guide - Svelte AI Elements",
		description:
			"Complete setup guide for building AI-powered Svelte applications. Install Svelte, configure UI components, and integrate AI models in 10 minutes.",
	}}
/>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
		<article
			class="prose prose-gray dark:prose-invert max-w-none lg:col-span-3"
			bind:this={toc.ref}
		>
			<header class="mb-8 sm:mb-12">
				<h1
					data-toc-index={false}
					class="mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl"
				>
					Basic Setup Guide
				</h1>

				<div
					class="mb-8 rounded-r border-l-4 border-zinc-300 bg-zinc-50 py-3 pl-4 sm:mb-10 dark:border-zinc-600 dark:bg-zinc-900/50"
				>
					<p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
						Goal: Set up a complete development environment for building AI-powered
						Svelte applications with all necessary tools and configurations
					</p>
				</div>

				<div
					class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30"
				>
					<p class="flex gap-2 text-sm text-blue-900 dark:text-blue-200">
						<InfoIcon strokeWidth={1.6} class="mt-0.5 size-5 shrink-0" />
						<span
							><strong>Reusable Guide:</strong> This setup guide is referenced across all
							Svelte AI Elements tutorials. Complete these steps once, and you're ready
							for any advanced guide!</span
						>
					</p>
				</div>
			</header>

			<!-- Step 1: Installing Svelte -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 1: Installing Svelte</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Create a new SvelteKit project with TypeScript and Tailwind CSS support. We'll
					use the <strong>sv</strong> CLI for quick setup:
				</p>

				<div class="mb-6">
					<AiInstallCommand command="execute" args={["sv", "create", "my-ai-app"]} />
				</div>

				<p class="mt-6 mb-5 text-sm leading-relaxed sm:text-base">
					When prompted, select the following options:
				</p>
				<ul
					class="text-muted-foreground mb-6 list-disc space-y-2 pl-6 text-sm sm:text-base"
				>
					<li>
						Which template? → <span class="text-primary font-medium"
							>SvelteKit minimal</span
						>
					</li>
					<li>
						Add type checking? → <span class="text-primary font-medium"
							>Yes, using TypeScript</span
						>
					</li>
					<li>
						Add additional options? → <span class="text-primary font-medium"
							>Add Tailwind CSS</span
						>
					</li>
				</ul>

				<p class="mt-6 mb-4 text-sm leading-relaxed sm:text-base">
					Navigate to your project directory:
				</p>
				<div class="mb-6">
					<CodeNameBlock filename="terminal" lang="bash" code={`cd my-ai-app`} />
				</div>

				<div
					class="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30"
				>
					<p class="flex gap-2 text-sm text-green-900 dark:text-green-200">
						<CircleCheckIcon strokeWidth={1.6} class="mt-0.5 size-5 shrink-0" />
						<span
							><strong>Success!</strong> You now have a modern SvelteKit project with TypeScript
							and Tailwind CSS ready to go.</span
						>
					</p>
				</div>
			</section>

			<!-- Step 2: Installing shadcn-svelte -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 2: Installing shadcn-svelte</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					<strong>shadcn-svelte</strong> provides beautiful, accessible UI components that
					integrate seamlessly with Tailwind CSS. Install and configure it:
				</p>

				<div class="mb-6">
					<AiInstallCommand
						command="execute"
						args={["pnpm", "dlx", "shadcn-svelte@latest", "init"]}
					/>
				</div>

				<p class="mt-6 mb-5 text-sm leading-relaxed sm:text-base">
					Configure <CodeSpan>components.json</CodeSpan> with the following settings:
				</p>

				<div
					class="dark:bg-card mb-6 w-full rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800"
				>
					<div class="no-scrollbar overflow-x-auto p-4">
						<pre class="text-muted-foreground font-mono text-sm leading-relaxed"><code
								>Which base color would you like to use? › <span
									class="text-primary">Neutral</span
								>
Where is your global CSS file? › <span class="text-primary">src/app.css</span>
Configure the import alias for lib: › <span class="text-primary">$lib</span>
Configure the import alias for components: › <span class="text-primary">$lib/components</span>
Configure the import alias for utils: › <span class="text-primary">$lib/utils</span>
Configure the import alias for hooks: › <span class="text-primary">$lib/hooks</span>
Configure the import alias for ui: › <span class="text-primary">$lib/components/ui</span></code
							></pre>
					</div>
				</div>

				<p class="text-muted-foreground mt-6 text-sm leading-relaxed sm:text-base">
					This creates a <CodeSpan>lib/components/ui</CodeSpan> directory structure with pre-configured
					components that work perfectly with Svelte AI Elements.
				</p>
			</section>

			<!-- Step 3: Configuring OpenRouter -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 3: Configuring OpenRouter & AI Models</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					OpenRouter provides free access to multiple AI models through a single API.
					Let's set it up:
				</p>

				<div class="mb-6 space-y-4">
					<!-- border border-zinc-200 dark:border-zinc-800 -->
					<div
						class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
					>
						<h4
							class="mb-2 flex items-center gap-2 text-base font-semibold"
							data-toc-index={false}
						>
							<span class="text-primary">1.</span> Get Your API Key
						</h4>
						<p class="text-muted-foreground mb-3 text-sm">
							Visit <a
								href="https://openrouter.ai/keys"
								class="text-primary underline"
								target="_blank"
								rel="noopener noreferrer">https://openrouter.ai/keys</a
							> and sign up for a free account. Generate your API key.
						</p>
					</div>

					<div
						class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
					>
						<h4
							class="mb-2 flex items-center gap-2 text-base font-semibold"
							data-toc-index={false}
						>
							<span class="text-primary">2.</span> Create Environment File
						</h4>
						<p class="text-muted-foreground mb-3 text-sm">
							Create a <CodeSpan>.env.local</CodeSpan> file in your project root:
						</p>
						<div class="mb-3">
							<CodeNameBlock
								filename=".env.local"
								lang="bash"
								code={`OPENROUTER_API_KEY=your_api_key_here`}
							/>
						</div>
					</div>

					<div
						class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
					>
						<h4
							class="mb-2 flex items-center gap-2 text-base font-semibold"
							data-toc-index={false}
						>
							<span class="text-primary">3.</span> Free AI Models Available
						</h4>
						<p class="text-muted-foreground mb-3 text-sm">
							You can use these free models for testing and development:
						</p>
						<div class="bg-card border-border rounded-lg border p-3">
							<pre
								class="dark:text-muted-foreground font-mono text-xs leading-relaxed"><code
									>x-ai/grok-4-fast:free
deepseek/deepseek-chat-v3.1:free
z-ai/glm-4.5-air:free
qwen/qwen3-coder:free
moonshotai/kimi-k2:free</code
								></pre>
						</div>
					</div>
				</div>

				<div
					class="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
				>
					<p class="flex gap-2 text-sm text-amber-900 dark:text-amber-200">
						<InfoIcon strokeWidth={1.6} class="mt-0.5 size-5 shrink-0" />
						<span
							><strong>Important:</strong> Never commit your <CodeSpan
								>.env.local</CodeSpan
							> file to version control. Add it to <CodeSpan>.gitignore</CodeSpan
							>.</span
						>
					</p>
				</div>
			</section>

			<!-- Step 4: AI SDK Integration -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 4: AI SDK Integration</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Install the Vercel AI SDK and OpenRouter provider to enable streaming AI
					responses:
				</p>

				<div class="mb-6">
					<AiInstallCommand
						command="add"
						args={["ai", "@ai-sdk/svelte", "@openrouter/ai-sdk-provider"]}
					/>
				</div>

				<p class="mt-6 mb-4 text-sm leading-relaxed sm:text-base">
					Create an AI configuration file to manage your AI settings:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="src/lib/ai-config.ts"
						lang="typescript"
						code={`import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Choose your preferred free model
export const defaultModel = 'z-ai/glm-4.5-air:free';`}
					/>
				</div>

				<p class="text-muted-foreground mt-6 text-sm leading-relaxed sm:text-base">
					This configuration file allows you to easily switch between different AI models
					and manage your API credentials in one place.
				</p>
			</section>

			<!-- Step 5: Adding Components -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 5: Adding Svelte AI Elements Components</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Svelte AI Elements provides pre-built components for common AI patterns. Add
					components as needed using the CLI:
				</p>

				<div
					class="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
				>
					<h4 class="mb-3 text-base font-semibold" data-toc-index={false}>
						Example: Adding Components
					</h4>
					<p class="text-muted-foreground mb-4 text-sm">
						Install specific components for your project:
					</p>

					<div class="space-y-3">
						<div>
							<p class="text-muted-foreground mb-2 text-xs">For chat interfaces:</p>
							<AiInstallCommand
								command="execute"
								args={[
									"pnpx",
									"shadcn-svelte@latest",
									"add",
									"https://svelte-ai-elements.vercel.app/r/message.json",
								]}
							/>
						</div>

						<div class="pt-2">
							<p class="text-muted-foreground mb-2 text-xs">For prompt inputs:</p>
							<AiInstallCommand
								command="execute"
								args={[
									"pnpx",
									"shadcn-svelte@latest",
									"add",
									"https://svelte-ai-elements.vercel.app/r/prompt-input.json",
								]}
							/>
						</div>

						<div class="pt-2">
							<p class="text-muted-foreground mb-2 text-xs">For loading states:</p>
							<AiInstallCommand
								command="execute"
								args={[
									"pnpx",
									"shadcn-svelte@latest",
									"add",
									"https://svelte-ai-elements.vercel.app/r/loader.json",
								]}
							/>
						</div>
					</div>
				</div>

				<div
					class="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30"
				>
					<p class="flex gap-2 text-sm text-blue-900 dark:text-blue-200">
						<InfoIcon strokeWidth={1.6} class="mt-0.5 size-5 shrink-0" />
						<span
							><strong>Note:</strong> Each guide will specify which components to
							install using the <CodeSpan>[COMPONENT]</CodeSpan> placeholder. Install only
							the components you need for that specific tutorial.</span
						>
					</p>
				</div>

				<!-- <p class="mt-6 text-sm sm:text-base leading-relaxed">
          Browse all available components at <a
            href="https://svelte-ai-elements.vercel.app/components"
            class="underline text-primary"
            >svelte-ai-elements.vercel.app/components</a
          >.
        </p> -->
			</section>

			<!-- Verification Section -->
			<section class="mb-12 sm:mb-6">
				<Subheading>Verifying Your Setup</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Let's verify everything is working correctly. Start the development server:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="terminal"
						lang="bash"
						code={`npm run dev
# or
pnpm dev
# or
bun dev`}
					/>
				</div>

				<p class="mt-6 mb-4 text-sm leading-relaxed sm:text-base">
					Your development server should start at <CodeSpan
						>http://localhost:5173</CodeSpan
					>. Check for:
				</p>

				<ul
					class="text-muted-foreground mb-6 list-disc space-y-2 pl-6 text-sm sm:text-base"
				>
					<li>No TypeScript errors in terminal</li>
					<li>Tailwind CSS styles loading correctly</li>
					<li>No console errors in browser DevTools</li>
					<li>Environment variables loaded (check your backend routes)</li>
				</ul>

				<div
					class="mt-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200"
				>
					<CircleCheckIcon strokeWidth={1.6} class="mt-0.5 size-5 shrink-0" />
					<p class="flex gap-2 text-sm text-green-900 dark:text-green-200">
						Your development environment is ready. You can now proceed with any Svelte
						AI Elements tutorial or guide.
					</p>
				</div>
			</section>

			<!-- Footer -->
			<section class="border-border border-t pt-6">
				<div
					class="rounded-lg bg-gradient-to-r from-neutral-100 to-blue-500/10 p-6 dark:from-neutral-900 dark:to-blue-900/30"
				>
					<h2 class="mb-3 text-lg font-semibold" id="ready-to-build">
						Ready to Build Something Amazing?
					</h2>
					<p class="text-muted-foreground mb-4 text-sm">
						You've completed the basic setup! This foundation will be referenced in all
						other guides. Bookmark this page for quick reference.
					</p>
					<div class="flex flex-wrap gap-3">
						<Button href="/guides" variant="default">
							<BookOpenIcon strokeWidth={1.5} class="mr-1" />
							Browse All Guides
						</Button>
						<Button href="/components" variant="outline">
							<ComponentIcon strokeWidth={1.5} class="mr-1" />
							Explore Components
						</Button>
					</div>
				</div>
			</section>
		</article>

		<!-- Table of Contents Sidebar -->
		<aside class="hidden lg:block">
			<div class="bg-muted/30 sticky top-4 rounded-lg p-4 lg:top-24 lg:p-6">
				<h3
					class="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase"
				>
					On this page
				</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</div>
