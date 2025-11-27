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

	let serverCode = `import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { getLocation, getWeather } from "$lib/components/cookbook/tools";

// Combine multiple tools
const tools = {
  getLocation,
  getWeather
};

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5)  // Allow up to 5 steps
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
				<OpenInMenu componentName="Call Tool Multiple Steps" {llmsTxtUrl} type="ai-elements" />
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
			<code class="text-foreground">getLocation</code> to find your city, then uses that result to
			call <code class="text-foreground">getWeather</code>. All automatic—no manual orchestration needed.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Watch the AI chain location → weather calls!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Execution Flow</h2>
		<CodeNameBlock filename="flow.ts" lang="typescript" code={flowCode} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Define Multiple Tools</h2>
		<CodeNameBlock filename="tools.ts" lang="typescript" code={toolsCode} highlight={[[2, 8], [13, 20]]} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Simply pass all tools to <code class="text-foreground">streamText</code>. The AI handles the orchestration.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} highlight={[[4, 7]]} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/call-tool-multiple-steps"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="call-tool-multiple-steps" />
	</footer>
</article>

