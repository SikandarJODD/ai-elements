<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		CodeNameBlock,
		CodeSpan,
		Subheading,
	} from "$lib/components/docs";
	import * as Toc from "$lib/components/docs/base/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	import { PMCommand } from "$lib/components/ui/pm-command";

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
			</header>

			<!-- Step 1: Installing Svelte -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 1: Installing Svelte</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Create a new SvelteKit project with TypeScript and Tailwind CSS.
				</p>

				<div class="mb-6">
					<PMCommand command="execute" args={["sv", "create", "sv-ai-app"]} />
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
			</section>

			<!-- Step 2: Installing shadcn-svelte -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 2: Installing shadcn-svelte</Subheading>
				<div class="mb-6">
					<PMCommand command="execute" args={["shadcn-svelte@latest", "init"]} />
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
Where is your global CSS file? › <span class="text-primary">src/routes/layout.css</span>
Configure the import alias for lib: › <span class="text-primary">$lib</span>
Configure the import alias for components: › <span class="text-primary">$lib/components</span>
Configure the import alias for utils: › <span class="text-primary">$lib/utils</span>
Configure the import alias for hooks: › <span class="text-primary">$lib/hooks</span>
Configure the import alias for ui: › <span class="text-primary">$lib/components/ui</span></code
							></pre>
					</div>
				</div>
			</section>

			<!-- Step 3: Configuring OpenRouter -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 3: OpenRouter Setup</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					OpenRouter provides free access to multiple AI models through a single API.
					<a
						href="https://openrouter.ai/keys"
						class="text-blue-500 underline underline-offset-2"
						target="_blank"
						rel="noopener noreferrer">Generate API Key</a
					>
				</p>

				<div class="mb-6 space-y-4">
					<CodeNameBlock
						filename=".env.local"
						lang="bash"
						code={`OPENROUTER_API_KEY=your_api_key_here`}
						hideLines={true}
					/>
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
					<PMCommand
						command="add"
						args={["ai", "@ai-sdk/svelte", "@openrouter/ai-sdk-provider"]}
					/>
				</div>

				<p class="mt-6 mb-4 text-sm leading-relaxed sm:text-base">
					Create an AI configuration file to manage your AI settings:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="src/lib/ai.ts"
						lang="typescript"
						code={`import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Choose your preferred free model from OpenRouter : https://openrouter.ai/models
export const defaultModel = 'z-ai/glm-4.5-air:free';`}
					/>
				</div>
			</section>

			<!-- Step 5: Adding Components -->
			<section class="mb-12 sm:mb-16">
				<Subheading>Step 5: Add Components</Subheading>
				<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
					Svelte AI Elements provides pre-built components for common AI patterns.
					<br />
					Let's add the Message component to your project:
				</p>

				<div class="space-y-3">
					<PMCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							"https://svelte-ai-elements.vercel.app/r/message.json",
						]}
					/>
				</div>
			</section>

			<AiElementsPrevNext currentSlug="basic-setup" />
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
