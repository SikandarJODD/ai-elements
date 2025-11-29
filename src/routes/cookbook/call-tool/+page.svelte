<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/call-tool/llms.txt`;

	let toolCode = `import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
  description: "Get the weather for a location",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather for"),
    unit: z.enum(["C", "F"]).describe("Temperature unit")
  }),
  execute: async ({ city, unit }) => {
    // In production, call a real weather API
    const weather = { value: 24, description: "Sunny" };
    return \`It is \${weather.value}°\${unit} and \${weather.description} in \${city}!\`;
  }
});`;

	let serverCode = `import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { getWeather } from "$lib/components/cookbook/tools";

const tools = { getWeather };

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5)  // Prevent infinite loops
  });

  return result.toUIMessageStreamResponse();
};`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let chat = new Chat({
    transport: new DefaultChatTransport({
      api: "/api/cookbook/call-tool"
    })
  });
<\/script>

{#each chat.messages as message}
  {#each message.parts as part}
    {#if part.type === "text"}
      <p>{part.text}</p>
    {:else if part.type === "tool-invocation"}
      <div class="tool-call">
        <strong>Tool: {part.toolInvocation.toolName}</strong>
        <pre>{JSON.stringify(part.toolInvocation.args)}</pre>
        {#if part.toolInvocation.state === "result"}
          <p>Result: {part.toolInvocation.result}</p>
        {/if}
      </div>
    {/if}
  {/each}
{/each}`;
</script>

<MetaTags
	title="Call Tool - Svelte Cookbook"
	description="Enable AI to call custom tools and functions to perform actions or retrieve external data."
	openGraph={{
		title: "Call Tool - Svelte Cookbook",
		description: "Enable AI to call custom tools and functions.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/call-tool",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Call Tool</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Call Tool" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Tools</Badge>
			<Badge variant="secondary">Function Calling</Badge>
			<Badge variant="secondary">Zod</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Give your AI the ability to call custom functions. The AI decides when to use tools based
			on the conversation—like fetching weather, querying databases, or calling APIs.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">How Tools Work</h2>
		<p class="text-muted-foreground leading-relaxed">
			When you ask "What's the weather in Tokyo?", the AI recognizes it needs weather data. It
			calls the <code class="text-foreground">getWeather</code> tool with the right parameters, gets
			the result, and formulates a natural response.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Try asking about weather in any city!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Define a Tool</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Tools have three parts: a <code class="text-foreground">description</code> (helps AI understand
			when to use it), an <code class="text-foreground">inputSchema</code> (validates parameters), and
			an <code class="text-foreground">execute</code> function (runs when called).
		</p>
		<CodeNameBlock filename="tools/get-weather.ts" lang="typescript" code={toolCode} highlight={[[4, 14]]} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Pass tools to <code class="text-foreground">streamText</code>. The
			<code class="text-foreground">stopWhen: stepCountIs(5)</code> prevents infinite tool loops.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} highlight={[[10, 17]]} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Check <code class="text-foreground">part.type === "tool-invocation"</code> to display tool calls
			and their results in your UI.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[[15, 22]]} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/call-tool"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="call-tool" />
	</footer>
</article>

