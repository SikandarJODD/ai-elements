<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/call-tool-multiple-steps/llms.txt`;

	let toolsCode = `// tools/get-location.ts
export const getLocation = tool({
  description: "Get the user's current location",
  inputSchema: z.object({}),
  execute: async () => {
    // In production, use geolocation API
    return "San Francisco";
  }
});

// tools/get-weather.ts
export const getWeather = tool({
  description: "Get weather for a city",
  inputSchema: z.object({
    city: z.string(),
    unit: z.enum(["C", "F"])
  }),
  execute: async ({ city, unit }) => {
    return \`24°\${unit} and Sunny in \${city}\`;
  }
});`;

	let serverCode = `import {
  type InferUITools,
  type ToolSet,
  type UIDataTypes,
  type UIMessage,
  convertToModelMessages,
  stepCountIs,
  streamText,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { getLocation, getWeather } from "$lib/components/cookbook/tools";

// Combine multiple tools
const tools = {
  getLocation,
  getWeather,
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export const POST = async ({ request }) => {
  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });
  const { messages }: { messages: ChatMessage[] } = await request.json();

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: "You are a helpful assistant. Response in 100 words.",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
};`;

	let flowCode = `// The AI automatically chains tool calls:
//
// User: "What's the weather where I am?"
//
// Step 1: AI calls getLocation()
//         → Returns "San Francisco"
//
// Step 2: AI calls getWeather({ city: "San Francisco", unit: "C" })
//         → Returns "24°C and Sunny in San Francisco"
//
// Step 3: AI responds with natural language
//         → "The weather in San Francisco is 24°C and sunny!"`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let chat = $derived(
    new Chat({
      transport: new DefaultChatTransport({
        api: "/api/cookbook/call-tool-multiple-steps",
      }),
    })
  );

  let input = $state("What's the weather where I am?");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!input.trim() || chat.status === "streaming") return;
    chat.sendMessage({ text: input });
    input = "";
  }
<\/script>

<Card>
  <CardContent class="space-y-4">
    <form onsubmit={handleSubmit} class="flex gap-2">
      <Input bind:value={input} placeholder="Ask about weather..." class="flex-1" />
      <Button type="submit" disabled={chat.status === "streaming"}>
        {chat.status === "streaming" ? "..." : "Send"}
      </Button>
    </form>

    {#if chat.messages.length > 0}
      <div class="space-y-4">
        {#each chat.messages as message}
          <div class="space-y-2">
            <div class="text-muted-foreground text-xs font-medium uppercase">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
            {#each message.parts as part}
              {#if part.type === "text"}
                <p class="text-sm whitespace-pre-wrap">{part.text}</p>
              {:else if part.type.startsWith("tool-")}
                <!-- Render tool call UI based on part.state -->
                <div class="rounded border p-2 text-xs">
                  <span class="font-medium">{part.toolName}</span>
                  {#if part.state === "output-available"}
                    <span class="text-green-500">✓</span>
                  {:else}
                    <span class="animate-pulse">...</span>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </CardContent>
</Card>`;
</script>

<MetaTags
	title="Call Tool Multiple Steps - Svelte Cookbook"
	description="Chain multiple AI tool calls where each step depends on the previous result."
	openGraph={{
		title: "Call Tool Multiple Steps - Svelte Cookbook",
		description: "Chain multiple AI tool calls where each step depends on the previous result.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/call-tool-multiple-steps",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Call Tool Multiple Steps</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Call Tool Multiple Steps" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Tools</Badge>
			<Badge variant="secondary">Multi-step</Badge>
			<Badge variant="secondary">Chaining</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Chain multiple tool calls where the output of one becomes the input of another. The AI
			autonomously decides the execution order to fulfill the user's request.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">The Chain in Action</h2>
		<p class="text-muted-foreground leading-relaxed">
			When you ask "What's the weather where I am?", the AI first calls
			<code class="text-foreground">getLocation</code> to find your city, then uses that
			result to call <code class="text-foreground">getWeather</code>. All automatic—no manual
			orchestration needed.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">
			Watch the AI chain location → weather calls!
		</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Execution Flow</h2>
		<CodeNameBlock filename="flow.ts" lang="typescript" code={flowCode} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Define Multiple Tools</h2>
		<CodeNameBlock filename="tools.ts" lang="typescript" code={toolsCode} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Simply pass all tools to <code class="text-foreground">streamText</code>. The AI handles
			the orchestration.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The client uses the <code class="text-foreground">Chat</code> class to send messages and
			render tool call results as they stream in.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/call-tool-multiple-steps"
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
		<CookbookPrevNext currentSlug="call-tool-multiple-steps" />
	</footer>
</article>
