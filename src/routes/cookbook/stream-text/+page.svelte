<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	import DemoCode from "./demo/demo.svelte?raw";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { CodeChip, H1, H2, Paragraph } from "$lib/components/docs/markdown";
	import { SingleFile } from "$lib/components/ui/code";

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
		url: "https://svelte-ai-elements.vercel.app/cookbook/stream-text",
	}}
/>

<article class="mx-auto px-4 py-8 md:px-6 md:py-10">
	<header class="mb-12">
		<div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
			<H1 id="stream-text" class="text-3xl font-semibold tracking-tight sm:text-4xl">
				Stream Text
			</H1>
			<CopyPageDropdown class="shrink-0" componentName="Stream Text" {llmsTxtUrl} />
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-xs">Streaming</Badge>
			<Badge variant="secondary" class="text-xs">Real-time</Badge>
			<Badge variant="secondary" class="text-xs">AI SDK</Badge>
		</div>
	</header>

	<section class="mb-12">
		<H2 id="overview" class="mb-4 text-2xl font-semibold">Overview</H2>
		<Paragraph class="mt-0">
			Streaming is essential for building responsive AI applications. Instead of waiting for
			the complete response, users see text appearing character by character, providing
			immediate feedback and a more engaging experience.
		</Paragraph>
		<Paragraph>
			This recipe uses the <CodeChip>Chat</CodeChip> class from
			<CodeChip>@ai-sdk/svelte</CodeChip>
			which manages conversation state and provides reactive updates, making it easy to build chat
			interfaces in Svelte 5.
		</Paragraph>
	</section>

	<section class="mb-12">
		<H2 id="demo" class="mb-6 text-2xl font-semibold">Demo</H2>
		<Demo />
	</section>

	<section class="mb-12">
		<H2 id="create-prompt-ui" class="mb-2 text-2xl font-semibold">Step 1: Create Prompt UI</H2>
		<Paragraph class="mb-6 mt-0">
			Start by creating a simple chat interface with an input field and a submit button.
		</Paragraph>
		<SingleFile
			code={{
				name: "+page.svelte",
				lang: "svelte",
				code: clientCode,
				highlight: [
					[2, 3],
					[9, 14],
					[20, 20],
				],
			}}
		/>
	</section>

	<section class="mb-12">
		<H2 id="create-api-endpoint" class="mb-6 text-2xl font-semibold">
			Step 2: Create API Endpoint
		</H2>
		<Paragraph class="mb-6 mt-0">
			The server endpoint uses <CodeChip>streamText</CodeChip> to generate responses and
			<CodeChip>toUIMessageStreamResponse()</CodeChip> to stream them back to the client in a format
			the Chat class can consume.
		</Paragraph>
		<SingleFile
			code={{
				name: "src/routes/api/cookbook/stream-text/+server.ts",
				lang: "typescript",
				code: serverCode,
			}}
		/>
	</section>

	<CookbookPrevNext currentSlug="stream-text" />
</article>
