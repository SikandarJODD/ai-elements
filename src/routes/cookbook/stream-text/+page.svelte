<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/stream-text/llms.txt`;

	let clientCode = `<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/stream-text",
			}),
		})
	);

	let input = $state("");
	let isStreaming = $derived(chat.status === "streaming");

	// Check if last message is assistant with no text yet
	let showTypingIndicator = $derived(() => {
		if (!isStreaming) return false;
		const lastMsg = chat.messages[chat.messages.length - 1];
		if (!lastMsg || lastMsg.role !== "assistant") return false;
		const textPart = lastMsg.parts.find((p) => p.type === "text");
		return !textPart || !(textPart as { text?: string }).text;
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || isStreaming) return;
		chat.sendMessage({ text: input });
		input = "";
	}
<\/script>

<form onsubmit={handleSubmit}>
	<input bind:value={input} placeholder="Type your message..." disabled={isStreaming} />
	<button type="submit" disabled={!input.trim() || isStreaming}>
		{#if isStreaming}
			<LoaderIcon class="size-4 animate-spin" />
		{:else}
			<SendIcon class="size-4" />
		{/if}
	</button>
</form>

{#each chat.messages as message}
	<div>
		<strong>{message.role}:</strong>
		{#each message.parts as part}
			{#if part.type === "text"}
				{part.text}
			{/if}
		{/each}
	</div>
{/each}

<!-- Skeleton loading indicator -->
{#if showTypingIndicator()}
	<div class="space-y-1.5">
		<div class="bg-muted h-3 w-full animate-pulse rounded"></div>
		<div class="bg-muted h-3 w-11/12 animate-pulse rounded"></div>
		<div class="bg-muted h-3 w-3/4 animate-pulse rounded"></div>
	</div>
{/if}`;

	let serverCode = `import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	// Use custom API key if provided, otherwise use default
	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	const result = streamText({
		model: openrouter(defaultModel),
		system: "You are a helpful assistant. Response in 100 words.",
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
};`;
</script>

<MetaTags
	title="Stream Text - Svelte Cookbook"
	description="Learn how to stream text responses in real-time for better user experience with SvelteKit and the Vercel AI SDK."
	openGraph={{
		title: "Stream Text - Svelte Cookbook",
		description:
			"Learn how to stream text responses in real-time for better user experience with SvelteKit.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/stream-text",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Stream Text</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Stream Text" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Streaming</Badge>
			<Badge variant="secondary" class="text-sm">Real-time</Badge>
			<Badge variant="secondary" class="text-sm">AI SDK</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
			Stream text responses in real-time for better user experience. This recipe shows you how
			to build a responsive chat interface using the Vercel AI SDK's streaming capabilities.
		</p>
	</header>

	<!-- Overview -->
	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Overview</h2>
		<p class="text-muted-foreground leading-relaxed">
			Streaming is essential for building responsive AI applications. Instead of waiting for
			the complete response, users see text appearing character by character, providing
			immediate feedback and a more engaging experience.
		</p>
		<p class="text-muted-foreground leading-relaxed">
			This recipe uses the <code class="text-foreground">Chat</code> class from
			<code class="text-foreground">@ai-sdk/svelte</code>
			which manages conversation state and provides reactive updates, making it easy to build chat
			interfaces in Svelte 5.
		</p>
	</section>

	<!-- Demo Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Demo</h2>
		<Demo />
	</section>

	<!-- Client Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The client component uses the <code class="text-foreground">Chat</code> class to manage messages
			and handle streaming. It includes a loading indicator that shows skeleton placeholders while
			waiting for the assistant's response.
		</p>
		<CodeNameBlock
			filename="+page.svelte"
			lang="svelte"
			code={clientCode}
			highlight={[[7, 13], 30]}
		/>
	</section>

	<!-- Server Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The server endpoint uses <code class="text-foreground">streamText</code> to generate
			responses and <code class="text-foreground">toUIMessageStreamResponse()</code> to stream
			them back to the client in a format the Chat class can consume.
		</p>
		<CodeNameBlock
			filename="src/routes/api/cookbook/stream-text/+server.ts"
			lang="typescript"
			code={serverCode}
		/>
	</section>

	<!-- Key Concepts -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Key Concepts</h2>
		<div class="space-y-4">
			<div>
				<h3 class="text-foreground mb-1 font-medium">Chat Class</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Manages conversation state and provides reactive updates. Access messages via
					<code class="text-foreground">chat.messages</code> and send new messages with
					<code class="text-foreground">chat.sendMessage()</code>.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">Message Parts</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Each message contains parts (text, tools, etc.) that can be rendered
					individually. This allows for rich message content including tool calls and
					structured data.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">Stream Status</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Use <code class="text-foreground">chat.status</code> to check if the stream is active.
					Values include "idle", "streaming", and "error".
				</p>
			</div>
		</div>
	</section>

	<!-- GitHub Link -->
	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/stream-text"
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

		<!-- Previous / Next Navigation -->
		<CookbookPrevNext currentSlug="stream-text" />
	</footer>
</article>
