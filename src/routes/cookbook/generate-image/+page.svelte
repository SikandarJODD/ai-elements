<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-image/llms.txt`;

	let toolCode = `import { experimental_generateImage as generateImage, tool } from "ai";
import { z } from "zod";

export const generateImageTool = tool({
  description: "Generate an image",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate the image from")
  }),
  execute: async ({ prompt }) => {
    const { image } = await generateImage({
      model: "openai/gpt-5-nano",
      prompt
    });
    // In production, save to blob storage and return URL
    return { image: image.base64, prompt };
  }
});`;

	let serverCode = `import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { generateImageTool } from "$lib/components/cookbook/tools";

const tools = { generateImageTool };

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter("openai/gpt-4o"),
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5)
  });

  return result.toUIMessageStreamResponse();
};`;

	let displayCode = `{#each message.parts as part}
  {#if part.type === "tool-invocation"}
    {#if part.toolInvocation.state === "result"}
      <img
        src={\`data:image/png;base64,\${part.toolInvocation.result.image}\`}
        alt={part.toolInvocation.result.prompt}
        class="rounded-lg"
      />
    {:else}
      <span>🎨 Generating image...</span>
    {/if}
  {/if}
{/each}`;
</script>

<MetaTags
	title="Generate Image - Svelte Cookbook"
	description="Generate images from text prompts using AI image generation models."
	openGraph={{
		title: "Generate Image - Svelte Cookbook",
		description: "Generate images from text prompts using AI image generation models.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/generate-image",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Generate Image</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Generate Image" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Images</Badge>
			<Badge variant="secondary">Generation</Badge>
			<Badge variant="secondary">Tools</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Create images by describing what you want. The AI uses image generation models to
			transform your text prompts into visuals.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Describe an image to generate!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Image Generation Tool</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The <code class="text-foreground">experimental_generateImage</code> function creates images
			from prompts. Wrap it in a tool so the AI can call it when needed.
		</p>
		<CodeNameBlock
			filename="tools/generate-image.ts"
			lang="typescript"
			code={toolCode}
			highlight={[[10, 14]]}
		/>
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<CodeNameBlock
			filename="+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[[3, 3]]}
		/>
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Display Generated Images</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Images are returned as base64. Use a data URL to display them immediately without
			needing to upload to storage first.
		</p>
		<CodeNameBlock
			filename="+page.svelte"
			lang="svelte"
			code={displayCode}
			highlight={[[4, 7]]}
		/>
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/generate-image"
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
		<CookbookPrevNext currentSlug="generate-image" />
	</footer>
</article>
