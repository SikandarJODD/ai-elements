<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import {
		CodeChip,
		H1,
		H2,
		H3,
		Link,
		ListItem,
		Paragraph,
		UnorderedList
	} from "$lib/components/docs/markdown";
	import { PMCommand } from "$lib/components/ui/pm-command";
	import { SingleFile } from "$lib/components/ui/code";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/getting-started/llms.txt`;

	let envCode = `OPENROUTER_API_KEY=sk-or-v1-your-api-key-here`;

	let configCode = `// src/lib/config/ai.ts
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Free model - great for development
export const defaultModel = "z-ai/glm-4.5-air:free";`;

	let serverCode = `// src/routes/api/chat/+server.ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant.",
    messages: await convertToModelMessages(messages),
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

	const nextRecipes = [
		{
			href: "/cookbook/stream-text",
			title: "Stream Text",
			description: "Real-time streaming responses"
		},
		{
			href: "/cookbook/generate-object",
			title: "Generate Object",
			description: "Type-safe structured data"
		},
		{
			href: "/cookbook/call-tool",
			title: "Call Tool",
			description: "AI-powered function calling"
		},
		{
			href: "/cookbook/generate-image",
			title: "Generate Image",
			description: "Create images from text"
		}
	];
</script>

<MetaTags
	title="Getting Started - Svelte AI Cookbook"
	description="Build AI-powered Svelte applications with the Vercel AI SDK. Learn installation, setup, and your first AI chat."
	openGraph={{
		title: "Getting Started - Svelte AI Cookbook",
		description: "Build AI-powered Svelte applications with the Vercel AI SDK.",
		type: "article",
		url: "https://svelte-ai-elements.vercel.app/cookbook/getting-started",
	}}
/>

<article class="mx-auto px-4 py-8 md:px-6 md:py-10">
	<header class="mb-12">
		<div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
			<H1 id="getting-started" class="text-3xl font-semibold tracking-tight sm:text-4xl">
				Getting Started
			</H1>
			<CopyPageDropdown class="shrink-0" componentName="Getting Started" {llmsTxtUrl} />
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Introduction</Badge>
			<Badge variant="secondary">Setup</Badge>
			<Badge variant="secondary">SvelteKit</Badge>
		</div>

		<Paragraph class="mt-0 text-base sm:text-lg">
			Build AI-powered Svelte applications in minutes. This guide covers everything you need
			to get started with the Vercel AI SDK and SvelteKit.
		</Paragraph>
	</header>

	<!-- Prerequisites -->
	<section class="mb-12">
		<H2 id="prerequisites" class="mt-0 mb-6 text-3xl font-semibold">Prerequisites</H2>
		<UnorderedList class="mt-0 list-none space-y-3 pl-0">
			<ListItem class="text-foreground flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<Paragraph class="text-foreground mt-0">Node.js 18+ installed</Paragraph>
			</ListItem>
			<ListItem class="text-foreground flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<Paragraph class="text-foreground mt-0">
					A SvelteKit project with
					<Link
						href="https://next.shadcn-svelte.com/docs/installation"
						target="_blank"
						class="text-primary inline-flex items-center gap-1 align-middle"
					>
						shadcn-svelte <ExternalLinkIcon class="size-3" />
					</Link>
				</Paragraph>
			</ListItem>
			<ListItem class="text-foreground flex items-center gap-3">
				<CheckIcon class="size-5 text-green-500" />
				<Paragraph class="text-foreground mt-0">
					An OpenRouter API key
					<Link
						href="https://openrouter.ai/keys"
						target="_blank"
						class="text-primary ml-1 inline-flex items-center gap-1 align-middle"
					>
						(get one free) <ExternalLinkIcon class="size-3" />
					</Link>
				</Paragraph>
			</ListItem>
		</UnorderedList>
	</section>

	<!-- Step 1: Installation -->
	<section class="mb-12">
		<H2 id="install-packages" class="mt-0 mb-4 text-3xl font-semibold">
			1. Install Packages
		</H2>
		<Paragraph class="mb-6">
			Install the AI SDK core, Svelte bindings, OpenRouter provider, and Zod for schema
			validation.
		</Paragraph>
		<PMCommand
			command="add"
			args={["ai", "@ai-sdk/svelte", "@openrouter/ai-sdk-provider", "zod"]}
		/>
	</section>

	<!-- Step 2: Environment -->
	<section class="mb-12">
		<H2 id="set-up-environment" class="mt-0 mb-4 text-3xl font-semibold">
			2. Set Up Environment
		</H2>
		<Paragraph class="mb-6">
			Create a <CodeChip>.env</CodeChip> file in your project root with your OpenRouter
			API key.
		</Paragraph>
		<SingleFile
			code={{
				name: ".env",
				lang: "bash",
				code: envCode,
				highlight: [1],
			}}
		/>
		<Paragraph class="mt-3 text-sm">
			Get your free API key from
			<Link
				href="https://openrouter.ai/keys"
				target="_blank"
				class="text-primary inline-flex items-center gap-1 align-middle"
			>
				openrouter.ai/keys <ExternalLinkIcon class="size-3" />
			</Link>
		</Paragraph>
	</section>

	<!-- Step 3: AI Config -->
	<section class="mb-12">
		<H2 id="create-ai-config" class="mt-0 mb-4 text-3xl font-semibold">
			3. Create AI Config
		</H2>
		<Paragraph class="mb-6">
			Create a shared configuration file. This keeps your AI setup DRY and makes it easy to
			switch models.
		</Paragraph>
		<SingleFile
			code={{
				name: "src/lib/config/ai.ts",
				lang: "typescript",
				code: configCode,
			}}
		/>
	</section>

	<!-- Step 4: Server Endpoint -->
	<section class="mb-12">
		<H2 id="create-api-endpoint" class="mt-0 mb-4 text-3xl font-semibold">
			4. Create API Endpoint
		</H2>
		<Paragraph class="mb-6">
			Create a server endpoint that handles chat messages. The
			<CodeChip>streamText</CodeChip>
			function streams the AI response in real-time.
		</Paragraph>
		<SingleFile
			code={{
				name: "src/routes/api/chat/+server.ts",
				lang: "typescript",
				code: serverCode,
				highlight: [9, [17, 20], 23],
			}}
		/>
	</section>

	<!-- Step 5: Client Component -->
	<section class="mb-12">
		<H2 id="build-your-chat-ui" class="mt-0 mb-4 text-3xl font-semibold">
			5. Build Your Chat UI
		</H2>
		<Paragraph class="mb-6">
			Create a Svelte component that connects to your API. The <CodeChip>Chat</CodeChip>
			class from
			<CodeChip>@ai-sdk/svelte</CodeChip>
			handles all the state management.
		</Paragraph>
		<SingleFile
			code={{
				name: "src/routes/+page.svelte",
				lang: "svelte",
				code: clientCode,
				highlight: [[5, 9], 16],
			}}
		/>
	</section>

	<!-- What's Next -->
	<section class="mb-10" data-toc-index="false">
		<H2 id="whats-next" class="mt-0 mb-6 text-3xl font-semibold">What's Next?</H2>
		<Paragraph class="mb-6">
			You're all set! Explore more recipes to level up your AI app:
		</Paragraph>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each nextRecipes as recipe (recipe.href)}
				<Link
					href={recipe.href}
					class="hover:bg-secondary rounded-lg border p-4 no-underline transition-colors"
				>
					<H3 class="mt-0 text-base font-medium">{recipe.title}</H3>
					<Paragraph class="mt-1 text-sm">{recipe.description}</Paragraph>
				</Link>
			{/each}
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
