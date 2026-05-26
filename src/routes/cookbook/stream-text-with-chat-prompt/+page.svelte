<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { CodeChip, H1, H2, H3, Paragraph, Strong } from "$lib/components/docs/markdown";
	import { SingleFile } from "$lib/components/ui/code";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/stream-text-with-chat-prompt/llms.txt`;

	let serverCode = `import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
  // 1. Parse UIMessage array from request
  const { messages }: { messages: UIMessage[] } = await request.json();

  // 2. Use custom API key if provided, otherwise use default
  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  // 3. Convert UIMessage to ModelMessage format and stream
  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant. Response in 100 words.",
    messages: await convertToModelMessages(messages),
  });

  // 4. Return streaming response compatible with Chat class
  return result.toUIMessageStreamResponse({
    sendReasoning: false,
  });
};`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  // Chat class manages messages and streaming state
  let chat = $derived(
    new Chat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
    })
  );

  let input = $state("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!input.trim() || chat.status === "streaming") return;

    // Messages are automatically managed by Chat class
    chat.sendMessage({ text: input });
    input = "";
  }
<\/script>

<!-- Disable input while streaming -->
<button disabled={chat.status === "streaming"}>
  {chat.status === "streaming" ? "Streaming..." : "Send"}
</button>

<!-- Messages update reactively as stream arrives -->
{#each chat.messages as message}
  <div>
    <strong>{message.role}:</strong>
    {#each message.parts as part}
      {#if part.type === "text"}
        {part.text}
      {/if}
    {/each}
  </div>
{/each}`;
</script>

<MetaTags
	title="Stream Text with Chat Prompt - Svelte Cookbook"
	description="Combine streaming with chat prompts for responsive conversational AI in SvelteKit."
	openGraph={{
		title: "Stream Text with Chat Prompt - Svelte Cookbook",
		description:
			"Combine streaming with chat prompts for responsive conversational AI in SvelteKit.",
		type: "article",
		url: "https://svelte-ai-elements.vercel.app/cookbook/stream-text-with-chat-prompt",
	}}
/>

<article class="mx-auto px-4 py-8 md:px-6 md:py-10">
	<header class="mb-12">
		<div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
			<H1
				id="stream-text-with-chat-prompt"
				class="text-3xl font-semibold tracking-tight sm:text-4xl"
			>
				Stream Text with Chat Prompt
			</H1>
			<CopyPageDropdown
				class="shrink-0"
				componentName="Stream Text with Chat Prompt"
				{llmsTxtUrl}
			/>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Streaming</Badge>
			<Badge variant="secondary" class="text-sm">Chat Prompt</Badge>
			<Badge variant="secondary" class="text-sm">AI SDK</Badge>
		</div>

		<Paragraph class="mt-0 text-base sm:text-lg md:text-xl">
			The best of both worlds: <Strong>streaming</Strong> for real-time feedback and
			<Strong>chat prompts</Strong> for context-aware conversations.
		</Paragraph>
	</header>

	<section class="mb-12">
		<H2 id="overview" class="mb-4 text-2xl font-semibold">Overview</H2>
		<Paragraph class="mt-0">
			This pattern is the foundation of modern AI chat interfaces. Users see text appear
			character-by-character (streaming), while the AI maintains full awareness of the
			conversation history (chat prompts). The <CodeChip>Chat</CodeChip> class from
			<CodeChip>@ai-sdk/svelte</CodeChip> handles all the complexity for you.
		</Paragraph>
	</section>

	<section class="mb-12">
		<H2 id="demo" class="mb-6 text-2xl font-semibold">Demo</H2>
		<Paragraph class="mb-4 mt-0 text-sm">
			Watch the text stream in real-time. Try asking follow-up questions - the AI remembers
			context!
		</Paragraph>
		<Demo />
	</section>

	<section class="mb-12">
		<H2 id="server-endpoint" class="mb-6 text-2xl font-semibold">Server Endpoint</H2>
		<Paragraph class="mb-6 mt-0">
			The key is <CodeChip>convertToModelMessages()</CodeChip> which transforms client messages
			to the format expected by <CodeChip>streamText</CodeChip>.
		</Paragraph>
		<SingleFile
			code={{
				name: "Server Endpoint",
				code: serverCode,
				highlight: [1, 4, [6, 12], 15],
				lang: "typescript",
			}}
		/>
	</section>

	<section class="mb-12">
		<H2 id="client-component" class="mb-6 text-2xl font-semibold">Client Component</H2>
		<Paragraph class="mb-6 mt-0">
			The <CodeChip>Chat</CodeChip> class handles message management, streaming state, and reactive
			updates. Just call <CodeChip>sendMessage()</CodeChip>!
		</Paragraph>
		<SingleFile
			code={{
				name: "Client Component",
				code: clientCode,
				highlight: [[5, 11], 18, 25],
				lang: "svelte",
			}}
		/>
	</section>

	<section class="mb-12">
		<H2 id="key-concepts" class="mb-6 text-2xl font-semibold">Key Concepts</H2>
		<div class="space-y-4">
			<div>
				<H3 id="convert-to-model-messages" class="mb-1 mt-0 font-medium">
					convertToModelMessages()
				</H3>
				<Paragraph class="mt-0 text-sm">
					Transforms <CodeChip>UIMessage[]</CodeChip> (client format) to
					<CodeChip>ModelMessage[]</CodeChip> (model format). Essential for combining Chat class
					with streamText.
				</Paragraph>
			</div>
			<div>
				<H3 id="to-ui-message-stream-response" class="mb-1 mt-0 font-medium">
					toUIMessageStreamResponse()
				</H3>
				<Paragraph class="mt-0 text-sm">
					Returns a streaming response in the format the Chat class expects. Handles all
					the SSE complexity automatically.
				</Paragraph>
			</div>
			<div>
				<H3 id="chat-status" class="mb-1 mt-0 font-medium">chat.status</H3>
				<Paragraph class="mt-0 text-sm">
					Track streaming state: <CodeChip>"idle"</CodeChip>,
					<CodeChip>"streaming"</CodeChip>, or <CodeChip>"error"</CodeChip>. Use it to
					disable inputs and show loading states.
				</Paragraph>
			</div>
		</div>
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/stream-text-with-chat-prompt"
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

		<CookbookPrevNext currentSlug="stream-text-with-chat-prompt" />
	</footer>
</article>
