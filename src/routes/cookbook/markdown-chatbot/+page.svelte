<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/markdown-chatbot/llms.txt`;

	let serverCode = `import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

const defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter(defaultModel),
    system: \`You are a helpful assistant that provides well-formatted markdown.

Use these formatting features when appropriate:
- **Bold** for emphasis
- *Italic* for subtle emphasis
- Code blocks with syntax highlighting for code snippets
- Bullet lists for multiple items
- Numbered lists for steps
- Headers for organizing long responses
- Tables when comparing data
- Blockquotes for important notes

Always format code with the correct language identifier.\`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: false,
  });
};`;

	let markdownCode = `<script lang="ts">
  import { Streamdown } from "svelte-streamdown";
  import { mode } from "mode-watcher";
<\/script>

<!-- Renders streaming markdown with syntax highlighting -->
<Streamdown
  content={text}
  shikiTheme={mode.current === "dark"
    ? "github-dark-default"
    : "github-light-default"}
  baseTheme="shadcn"
/>`;

	let clientCode = `{#each message.parts as part}
  {#if part.type === "text"}
    {#if message.role === "user"}
      <!-- User messages: plain text -->
      <span>{part.text}</span>
    {:else}
      <!-- Assistant messages: rendered markdown -->
      <Markdown
        content={part.text}
        class="prose prose-sm dark:prose-invert max-w-none"
      />
    {/if}
  {/if}
{/each}`;
</script>

<MetaTags
	title="Markdown Chatbot - Svelte Cookbook"
	description="Render AI responses in beautiful markdown with syntax-highlighted code blocks in SvelteKit."
	openGraph={{
		title: "Markdown Chatbot - Svelte Cookbook",
		description:
			"Render AI responses in beautiful markdown with syntax-highlighted code blocks.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/markdown-chatbot",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Markdown Chatbot</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Markdown Chatbot" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Markdown</Badge>
			<Badge variant="secondary" class="text-sm">Syntax Highlighting</Badge>
			<Badge variant="secondary" class="text-sm">Streaming</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
			Transform plain AI responses into beautifully formatted content with
			<strong>syntax-highlighted code</strong>, lists, tables, and more.
		</p>
	</header>

	<!-- Overview -->
	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Overview</h2>
		<p class="text-muted-foreground leading-relaxed">
			Most AI responses contain markdown - code blocks, bullet points, headers. Raw markdown
			is hard to read. This recipe uses <code class="text-foreground">svelte-streamdown</code>
			to render streaming markdown with Shiki-powered syntax highlighting that works perfectly
			in both light and dark modes.
		</p>
	</section>

	<!-- Demo Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">
			Ask for code examples to see syntax highlighting in action!
		</p>
		<Demo />
	</section>

	<!-- Server Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Guide the AI to use markdown formatting with a system prompt:
		</p>
		<CodeNameBlock
			filename="src/routes/api/chat/+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[[19, 21]]}
		/>
	</section>

	<!-- Markdown Component Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">The Markdown Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			<code class="text-foreground">svelte-streamdown</code> handles streaming markdown gracefully,
			rendering partial content as it arrives:
		</p>
		<CodeNameBlock
			filename="markdown.svelte"
			lang="svelte"
			code={markdownCode}
			highlight={[[7, 11]]}
		/>
	</section>

	<!-- Client Rendering Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Rendering Messages</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Render user messages as plain text and assistant messages as markdown:
		</p>
		<CodeNameBlock
			filename="+page.svelte"
			lang="svelte"
			code={clientCode}
			highlight={[6, [7, 11]]}
		/>
	</section>

	<!-- Key Features -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Key Features</h2>
		<div class="space-y-4">
			<div>
				<h3 class="text-foreground mb-1 font-medium">Streaming Support</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Unlike regular markdown renderers, <code class="text-foreground"
						>svelte-streamdown</code
					>
					handles partial markdown gracefully - no flickering or broken rendering mid-stream.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">Syntax Highlighting</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Shiki provides beautiful syntax highlighting for 100+ languages. Themes adapt
					automatically to light/dark mode.
				</p>
			</div>
			<div>
				<h3 class="text-foreground mb-1 font-medium">Prose Styling</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Tailwind's <code class="text-foreground">prose</code> classes style headings,
					lists, links, and more. Use
					<code class="text-foreground">dark:prose-invert</code>
					for dark mode.
				</p>
			</div>
		</div>
	</section>

	<!-- GitHub Link -->
	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/markdown-chatbot"
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

		<CookbookPrevNext currentSlug="markdown-chatbot" />
	</footer>
</article>
