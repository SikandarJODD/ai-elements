<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/getting-started/llms.txt`;

	let installCode = `npm install ai @ai-sdk/svelte @openrouter/ai-sdk-provider zod`;

	let envCode = `# .env
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here`;

	let configCode = `// src/lib/config/ai-config.ts
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Free model - great for development
export const defaultModel = "z-ai/glm-4.5-air:free";`;

	let serverCode = `// src/routes/api/chat/+server.ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let chat = new Chat({
    transport: new DefaultChatTransport({
      api: "/api/chat"
    })
  });

  let input = $state("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    chat.sendMessage({ text: input });
    input = "";
  }
<\/script>

<div class="max-w-md mx-auto p-4">
  {#each chat.messages as message}
    <div class="mb-2">
      <strong>{message.role === "user" ? "You" : "AI"}:</strong>
      {#each message.parts as part}
        {#if part.type === "text"}
          <span>{part.text}</span>
        {/if}
      {/each}
    </div>
  {/each}

  <form onsubmit={handleSubmit} class="flex gap-2">
    <input bind:value={input} class="flex-1 border p-2 rounded" />
    <button type="submit" class="bg-blue-500 text-white px-4 rounded">
      Send
    </button>
  </form>
</div>`;
</script>

<MetaTags
	title="Getting Started - Svelte AI Cookbook"
	description="Build AI-powered Svelte applications with the Vercel AI SDK. Learn installation, setup, and your first AI chat."
	openGraph={{
		title: "Getting Started - Svelte AI Cookbook",
		description: "Build AI-powered Svelte applications with the Vercel AI SDK.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/getting-started",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Getting Started</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Getting Started" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Introduction</Badge>
			<Badge variant="secondary">Setup</Badge>
			<Badge variant="secondary">SvelteKit</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Build AI-powered Svelte applications in minutes. This guide covers everything you need
			to get started with the Vercel AI SDK and SvelteKit.
		</p>
	</header>

	<!-- Prerequisites -->
	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Prerequisites</h2>
		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<span>Node.js 18+ installed</span>
			</div>
			<div class="flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<span>A SvelteKit project</span>
			</div>
			<div class="flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<span>
					An OpenRouter API key
					<a
						href="https://openrouter.ai/keys"
						target="_blank"
						class="text-primary ml-1 inline-flex items-center gap-1 underline underline-offset-2"
					>
						(get one free) <ExternalLinkIcon class="size-3" />
					</a>
				</span>
			</div>
		</div>
	</section>

	<!-- Step 1: Installation -->
	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">1. Install Packages</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Install the AI SDK core, Svelte bindings, OpenRouter provider, and Zod for schema
			validation.
		</p>
		<CodeNameBlock filename="terminal" lang="bash" code={installCode} />
	</section>

	<!-- Step 2: Environment -->
	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">2. Set Up Environment</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create a <code class="text-foreground">.env</code> file in your project root with your OpenRouter
			API key.
		</p>
		<CodeNameBlock filename=".env" lang="bash" code={envCode} />
	</section>

	<!-- Step 3: AI Config -->
	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">3. Create AI Config</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create a shared configuration file. This keeps your AI setup DRY and makes it easy to
			switch models.
		</p>
		<CodeNameBlock
			filename="src/lib/config/ai-config.ts"
			lang="typescript"
			code={configCode}
			highlight={[
				[4, 6],
				[9, 9],
			]}
		/>
	</section>

	<!-- Step 4: Server Endpoint -->
	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">4. Create API Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create a server endpoint that handles chat messages. The
			<code class="text-foreground">streamText</code> function streams the AI response in real-time.
		</p>
		<CodeNameBlock
			filename="src/routes/api/chat/+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[[9, 13]]}
		/>
	</section>

	<!-- Step 5: Client Component -->
	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">5. Build Your Chat UI</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create a Svelte component that connects to your API. The
			<code class="text-foreground">Chat</code> class from
			<code class="text-foreground">@ai-sdk/svelte</code>
			handles all the state management.
		</p>
		<CodeNameBlock
			filename="src/routes/+page.svelte"
			lang="svelte"
			code={clientCode}
			highlight={[[4, 8]]}
		/>
	</section>

	<!-- What's Next -->
	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">What's Next?</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			You're all set! Explore more recipes to level up your AI app:
		</p>
		<div class="grid gap-4 sm:grid-cols-2">
			<a
				href="/cookbook/stream-text"
				class="hover:border-primary rounded-lg border p-4 transition-colors"
			>
				<h3 class="font-medium">Stream Text</h3>
				<p class="text-muted-foreground text-sm">Real-time streaming responses</p>
			</a>
			<a
				href="/cookbook/generate-object"
				class="hover:border-primary rounded-lg border p-4 transition-colors"
			>
				<h3 class="font-medium">Generate Object</h3>
				<p class="text-muted-foreground text-sm">Type-safe structured data</p>
			</a>
			<a
				href="/cookbook/call-tool"
				class="hover:border-primary rounded-lg border p-4 transition-colors"
			>
				<h3 class="font-medium">Call Tool</h3>
				<p class="text-muted-foreground text-sm">AI-powered function calling</p>
			</a>
			<a
				href="/cookbook/generate-image"
				class="hover:border-primary rounded-lg border p-4 transition-colors"
			>
				<h3 class="font-medium">Generate Image</h3>
				<p class="text-muted-foreground text-sm">Create images from text</p>
			</a>
		</div>
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/getting-started"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="getting-started" />
	</footer>
</article>
