<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyPageDropdown, CodeNameBlock } from "$lib/components/docs";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	import DemoCode from "./demo/demo.svelte?raw";
	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/stream-text/llms.txt`;

	let clientCode = DemoCode;

	let serverCode = `import { type UIMessage, convertToModelMessages, streamText } from "ai";
import type { RequestHandler } from "./$types";
import { defaultModel, openrouter } from "$lib/config/ai";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	let result = streamText({
		model: openrouter(defaultModel),
		system: "Please keep response short and concise.",
		messages: await convertToModelMessages(messages),
	});
	return result.toUIMessageStreamResponse();
};
`;
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

<article class="mx-auto px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Stream Text</h1>
			<CopyPageDropdown
				class="shrink-0"
				componentName="Stream Text"
				{llmsTxtUrl}
				type="cookbook"
			/>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-xs">Streaming</Badge>
			<Badge variant="secondary" class="text-xs">Real-time</Badge>
			<Badge variant="secondary" class="text-xs">AI SDK</Badge>
		</div>
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
			This recipe uses the <code class="rounded-sm bg-yellow-900/40 text-yellow-500 px-1">Chat</code> class from
			<code class="rounded-sm bg-yellow-900/40 text-yellow-500 px-1">@ai-sdk/svelte</code>
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
		<h2 class="mb-2 text-2xl font-semibold">Step 1: Create Prompt UI</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Start by creating a simple chat interface with an input field and a submit button.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[2,3,[9,14],20]} />
	</section>

	<!-- Server Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Step 2: Create API Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The server endpoint uses <code class="rounded-sm bg-yellow-900/40 text-yellow-500 px-1">streamText</code> to generate
			responses and <code class="rounded-sm bg-yellow-900/40 text-yellow-500 px-1">toUIMessageStreamResponse()</code> to stream them
			back to the client in a format the Chat class can consume.
		</p>
		<CodeNameBlock
			filename="src/routes/api/cookbook/stream-text/+server.ts"
			lang="typescript"
			code={serverCode}
		/>
	</section>
	<CookbookPrevNext currentSlug="stream-text" />
</article>
