<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/render-visual-interface/llms.txt`;

	let toolsCode = `import { tool } from "ai";
import { z } from "zod";

// Server-side tool: fetches weather data
export const getWeatherInformation = tool({
  description: "show the weather in a given city to the user",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather information for")
  }),
  execute: async ({ city }) => {
    // In production, call a real weather API
    return {
      city,
      value: 24,
      unit: "celsius",
      weeklyForecast: [
        { day: "Mon", value: 24 },
        { day: "Tue", value: 25 },
        { day: "Wed", value: 26 },
        { day: "Thu", value: 27 },
        { day: "Fri", value: 28 }
      ]
    };
  }
});

// Client-side tool: shows confirmation UI (no execute function)
export const askForConfirmation = tool({
  description: "Ask the user for confirmation.",
  inputSchema: z.object({
    message: z.string().describe("The message to ask for confirmation.")
  }),
  outputSchema: z.string().describe("The user confirmation response.")
});

// Client-side tool: gets user location (no execute function)
export const getLocationClient = tool({
  description: "Get the user location.",
  inputSchema: z.object({}),
  outputSchema: z.string()
});`;

	let serverCode = `import type { RequestHandler } from "@sveltejs/kit";
import {
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
import {
  getWeatherInformation,
  askForConfirmation,
  getLocationClient,
} from "$lib/components/cookbook/tools";

const tools = {
  getWeatherInformation,
  askForConfirmation,
  getLocation: getLocationClient,
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });
  const { messages }: { messages: ChatMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
};`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
  import type { ChatMessage } from "./+server";

  let chat = $derived(
    new Chat<ChatMessage>({
      transport: new DefaultChatTransport({
        api: "/api/render-visual-interface"
      }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "getLocation") {
          chat.addToolOutput({
            tool: "getLocation",
            toolCallId: toolCall.toolCallId,
            output: "San Francisco"
          });
        }
      }
    })
  );

  let input = $state("");
  let isStreaming = $derived(chat.status === "streaming");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    chat.sendMessage({ text: input });
    input = "";
  }
<\/script>

<form onsubmit={handleSubmit} class="flex gap-2">
  <input bind:value={input} placeholder="Ask about weather..." />
  <button type="submit" disabled={isStreaming}>
    {isStreaming ? "..." : "Send"}
  </button>
</form>

{#if chat.messages.length > 0}
  <div class="space-y-3">
    {#each chat.messages as message}
      <div class="text-sm">
        <span class="font-medium">
          {message.role === "user" ? "User" : "Assistant"}:
        </span>
        {#each message.parts as part}
          {#if part.type === "text"}
            <span>{part.text}</span>

          {:else if part.type === "tool-getWeatherInformation"}
            {#if part.state === "output-available"}
              <div class="weather-card">
                <div class="temp">{part.output.value}°</div>
                <div class="forecast">
                  {#each part.output.weeklyForecast as day}
                    <span>{day.day}: {day.value}°</span>
                  {/each}
                </div>
              </div>
            {/if}

          {:else if part.type === "tool-askForConfirmation"}
            {#if part.state === "output-available"}
              <span class="confirmed">{part.output}</span>
            {:else}
              <button onclick={() => chat.addToolOutput({
                tool: "askForConfirmation",
                toolCallId: part.toolCallId,
                output: "Confirmed"
              })}>Yes</button>
              <button onclick={() => chat.addToolOutput({
                tool: "askForConfirmation",
                toolCallId: part.toolCallId,
                output: "Denied"
              })}>No</button>
            {/if}

          {:else if part.type === "tool-getLocation"}
            <span class="text-muted-foreground text-xs">
              {part.state === "output-available" ? \`📍 \${part.output}\` : "Getting location..."}
            </span>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
{/if}`;
</script>

<MetaTags
	title="Render Visual Interface - Svelte Cookbook"
	description="Render custom UI components for different tool outputs, including interactive elements."
	openGraph={{
		title: "Render Visual Interface - Svelte Cookbook",
		description: "Render custom UI components for different tool outputs.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/render-visual-interface",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Render Visual Interface</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Render Visual Interface" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">UI Components</Badge>
			<Badge variant="secondary">Interactive</Badge>
			<Badge variant="secondary">Tools</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Render rich UI components based on tool results. Create weather cards, confirmation
			dialogs, charts, or any custom interface elements—not just text.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Beyond Text Responses</h2>
		<p class="text-muted-foreground leading-relaxed">
			When the AI calls a weather tool, instead of showing raw JSON, render a beautiful
			weather card. For confirmations, show interactive buttons. Each tool can have its own
			custom UI.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Ask about weather to see the visual card!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Define Tools</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create tools using <code class="text-foreground">tool()</code> from AI SDK. Server-side
			tools have an <code class="text-foreground">execute</code> function, while client-side tools
			only define schemas—the client handles the execution.
		</p>
		<CodeNameBlock filename="tools.ts" lang="typescript" code={toolsCode} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Import tools and pass them to <code class="text-foreground">streamText</code>. Export
			types for client-side type safety using
			<code class="text-foreground">InferUITools</code>.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Use <code class="text-foreground">onToolCall</code> to handle client-side tools, and
			render different UI for each tool type based on
			<code class="text-foreground">part.type</code>
			and
			<code class="text-foreground">part.state</code>.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/render-visual-interface"
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
		<CookbookPrevNext currentSlug="render-visual-interface" />
	</footer>
</article>
