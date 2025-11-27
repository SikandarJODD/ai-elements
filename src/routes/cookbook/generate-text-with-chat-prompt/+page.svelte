<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-text-with-chat-prompt/llms.txt`;

	// highlight: line numbers to highlight (important code)
	let serverCode = `import { type ModelMessage, generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  // 1. Extract messages from request body
  const { messages }: { messages: ModelMessage[] } = await request.json();

  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  // 2. Use generateText with messages array (not prompt string)
  const result = await generateText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: "You are a helpful assistant. Respond in 100 words.",
    messages: messages,  // Pass full conversation history
  });

  // 3. Return the response messages
  return json(result.response.messages);
};`;

	let clientCode = `<script lang="ts">
  let messages = $state([]);
  let input = $state("");
  let isLoading = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to local state
    messages = [...messages, { role: "user", content: input }];
    isLoading = true;
    input = "";

    // Send full conversation history for context
    const response = await fetch("/api/cookbook/generate-chat-with-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const result = await response.json();

    // Extract and add assistant response
    const lastMessage = result[result.length - 1];
    messages = [...messages, {
      role: "assistant",
      content: lastMessage.content?.[0]?.text
    }];
    isLoading = false;
  }
<\/script>

<form onsubmit={handleSubmit}>
  <input bind:value={input} placeholder="Ask something..." />
  <button disabled={isLoading}>
    {isLoading ? "Thinking..." : "Send"}
  </button>
</form>

{#each messages as msg}
  <div><strong>{msg.role}:</strong> {msg.content}</div>
{/each}`;
</script>

<MetaTags
	title="Generate Text with Chat Prompt - Svelte Cookbook"
	description="Use chat-style prompts with generateText for conversational AI interactions in SvelteKit."
	openGraph={{
		title: "Generate Text with Chat Prompt - Svelte Cookbook",
		description:
			"Use chat-style prompts with generateText for conversational AI interactions in SvelteKit.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/generate-text-with-chat-prompt",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Generate Text with Chat Prompt</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu
					componentName="Generate Text with Chat Prompt"
					{llmsTxtUrl}
					type="ai-elements"
				/>
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Chat Prompt</Badge>
			<Badge variant="secondary" class="text-sm">Conversation</Badge>
			<Badge variant="secondary" class="text-sm">AI SDK</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
			Use chat-style prompts with <code class="text-foreground">generateText</code> to build conversational
			AI with system instructions and message history.
		</p>
	</header>

	<!-- Overview -->
	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Overview</h2>
		<p class="text-muted-foreground leading-relaxed">
			While simple prompts work for basic tasks, chat prompts unlock powerful features:
			<strong>system instructions</strong> to define AI behavior,
			<strong>conversation history</strong> for context-aware responses, and
			<strong>multi-turn interactions</strong> where the AI remembers previous exchanges.
		</p>
	</section>

	<!-- Demo Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">
			Try a multi-turn conversation. Say your name, then ask "What's my name?" - the AI
			remembers!
		</p>
		<Demo />
	</section>

	<!-- Server Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The server accepts a <code class="text-foreground">messages</code> array containing the
			full conversation history. Using <code class="text-foreground">ModelMessage[]</code> type
			ensures proper structure.
		</p>
		<CodeNameBlock
			filename="src/routes/api/chat/+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[9, [17, 20], 23]}
		/>
	</section>

	<!-- Client Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The client maintains local message state and sends the complete history with each
			request. This lets the AI maintain context across turns.
		</p>
		<CodeNameBlock
			filename="+page.svelte"
			lang="svelte"
			code={clientCode}
			highlight={[8, [15, 18]]}
		/>
	</section>

	<!-- Key Concepts -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Key Concepts</h2>
		<div class="space-y-4">
			<div>
				<h3 class="text-foreground mb-1 font-medium">ModelMessage Type</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Each message has a <code class="text-foreground">role</code>
					(user/assistant/system) and <code class="text-foreground">content</code>. This
					structure enables multi-turn conversations.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">System Message</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Use the <code class="text-foreground">system</code> parameter to set persistent instructions.
					This shapes the AI's personality and response style.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">Conversation History</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Send all previous messages with each request. The AI uses this context to give
					relevant, coherent responses.
				</p>
			</div>
		</div>
	</section>

	<!-- GitHub Link -->
	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/generate-text-with-chat-prompt"
			target="_blank"
			rel="noopener noreferrer"
			variant="outline"
			class="gap-2"
		>
			<svg
				class="h-4 w-4"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
				/>
			</svg>
			View Example on GitHub
		</Button>

		<CookbookPrevNext currentSlug="generate-text-with-chat-prompt" />
	</footer>
</article>
