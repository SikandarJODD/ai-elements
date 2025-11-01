<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
		CodeNameBlock,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/image/llms.txt`;
	// Component API Props Data
	const imageProps = [
		{
			name: "base64",
			type: "string",
			description: "Base64-encoded image data (required)",
		},
		{
			name: "uint8Array",
			type: "Uint8Array",
			description: "Optional Uint8Array representation of the image data",
		},
		{
			name: "mediaType",
			type: "string",
			description: "MIME type of the image (e.g., 'image/png', 'image/jpeg')",
		},
		{
			name: "alt",
			type: "string",
			description: "Alternative text for the image (for accessibility)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the image",
		},
		{
			name: "ref",
			type: "HTMLImageElement",
			description: "Bindable reference to the image element",
		},
		{
			name: "...restProps",
			type: "HTMLImgAttributes",
			description: "All other img element props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Image</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Image</CodeSpan> component displays AI-generated images from base64 encoded
				data. It's designed to work seamlessly with the AI SDK's
				<CodeSpan>Experimental_GeneratedImage</CodeSpan> type and provides automatic styling
				with proper accessibility features.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Image" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- Installation -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/image.json`}
				is_jsrepo={true}
				blockname="image"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<CodeNameBlock
					filename="image-usage.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Image } from "$lib/components/ai-elements/image/index.js";

  const exampleImage = {
    base64: "iVBORw0KGgoAAAANSUhEUgAA...", // Your base64 encoded image data
    mediaType: "image/png",
  };
\<\/script\>

<Image
  {...exampleImage}
  alt="Example generated image"
  class="aspect-square h-[150px] border"
/>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple app allowing users to generate images given a prompt using the AI
				SDK's image generation capabilities.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`<\script lang="ts"\>
  import { Image } from "$lib/components/ai-elements/image/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Loader } from "$lib/components/ai-elements/loader/index.js";

  let prompt = $state("A futuristic cityscape at sunset");
  let imageData = $state<{
    base64?: string;
    mediaType?: string;
  } | null>(null);
  let isLoading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;

    isLoading = true;
    imageData = null;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      imageData = data;
      prompt = "";
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      isLoading = false;
    }
  }
<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto p-4">
      {#if imageData}
        <div class="flex justify-center">
          <Image
            {...imageData}
            alt="Generated image"
            class="h-[300px] aspect-square border rounded-lg"
          />
        </div>
      {/if}
      {#if isLoading}
        <Loader />
      {/if}
    </div>

    <Input onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
      <PromptInputTextarea
        bind:value={prompt}
        placeholder="Describe the image you want to generate..."
        onchange={(e) => (prompt = e.currentTarget.value)}
        class="pr-12"
      />
      <PromptInputSubmit
        status={isLoading ? "submitted" : "ready"}
        disabled={!prompt.trim()}
        class="absolute bottom-1 right-1"
      />
    </Input>
  </div>
</div>`}
				/>
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following route to your backend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="api/chat/+server.ts"
					lang="typescript"
					code={`import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  const { image } = await generateImage({
    model: openai.image("dall-e-3"),
    prompt: prompt,
    size: "1024x1024",
  });

  return new Response(
    JSON.stringify({
      base64: image.base64,
      mediaType: image.mediaType,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};`}
				/>
			</div>

			<!-- API Reference -->
			<Subheading>API Reference</Subheading>

			<div class="space-y-4">
				<div>
					<h3 class="mb-2 text-base font-semibold">Props</h3>
					<div class="space-y-3">
						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">base64</code>
								<span class="text-muted-foreground text-xs">string</span>
								<span
									class="bg-destructive/10 text-destructive rounded px-2 py-0.5 text-xs"
									>required</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								The base64 encoded image data. This is the actual image content
								encoded as a base64 string.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">mediaType</code>
								<span class="text-muted-foreground text-xs">string</span>
								<span
									class="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
									>optional</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								The MIME type of the image (e.g., "image/png", "image/jpeg",
								"image/webp"). Used to construct the data URL.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">uint8Array</code>
								<span class="text-muted-foreground text-xs">Uint8Array</span>
								<span
									class="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
									>optional</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								The raw binary data as a Uint8Array. This is typically provided by
								the AI SDK but not directly used by the component (uses base64
								instead).
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">alt</code>
								<span class="text-muted-foreground text-xs">string</span>
								<span
									class="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
									>optional</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								Alternative text description for the image. Important for
								accessibility.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">class</code>
								<span class="text-muted-foreground text-xs">string</span>
								<span
									class="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
									>optional</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								Additional CSS classes to apply to the image element. Merged with
								default classes using <code class="text-sm">cn()</code> utility.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">ref</code>
								<span class="text-muted-foreground text-xs"
									>HTMLImageElement | null</span
								>
								<span
									class="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
									>optional</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								A reference to the underlying <code class="text-sm">img</code>
								element. Can be used with
								<code class="text-sm">bind:ref</code> for direct DOM access.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<div class="flex items-baseline gap-2">
								<code class="font-mono text-sm">...rest</code>
								<span class="text-muted-foreground text-xs">HTMLImgAttributes</span>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								All other standard HTML image attributes are supported (width,
								height, loading, etc.).
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-disc space-y-2 pl-6 text-sm sm:text-base">
				<li>
					Accepts <CodeSpan>Experimental_GeneratedImage</CodeSpan> objects directly from the
					AI SDK
				</li>
				<li>Automatically creates proper data URLs from base64-encoded image data</li>
				<li>Supports all standard HTML image attributes</li>
				<li>
					Responsive by default with <CodeSpan>max-w-full h-auto</CodeSpan> styling
				</li>
				<li>Customizable with additional CSS classes</li>
				<li>Includes proper TypeScript types for AI SDK compatibility</li>
			</ul>

			<!-- Default Styling -->
			<Subheading>Default Styling</Subheading>

			<p class="text-muted-foreground mb-4">
				The Image component comes with sensible default styles that can be overridden:
			</p>

			<ul class="text-muted-foreground list-inside list-disc space-y-2">
				<li>
					<code class="text-sm">h-auto</code> - Height adjusts automatically to maintain aspect
					ratio
				</li>
				<li>
					<code class="text-sm">max-w-full</code> - Prevents overflow from parent container
				</li>
				<li>
					<code class="text-sm">overflow-hidden</code> - Clips any content that overflows
				</li>
				<li>
					<code class="text-sm">rounded-md</code> - Applies medium border radius for a polished
					look
				</li>
			</ul>

			<!-- Integration with AI SDK -->
			<Subheading>Integration with AI SDK</Subheading>

			<p class="text-muted-foreground mb-4">
				The Image component is designed to work seamlessly with the AI SDK's experimental
				image generation features. Here's a complete example:
			</p>

			<CodeNameBlock
				filename="image-with-ai-sdk.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import { useChat } from '@ai-sdk/svelte';
  import { Image } from '$lib/components/ai-elements/image/index.js';

  const { messages, input, handleSubmit } = useChat();
\<\/script\>

<div class="space-y-4">
  {#each messages as message}
    {#if message.role === 'assistant'}
      <div class="space-y-2">
        {#if message.experimental_images}
          {#each message.experimental_images as image}
            <Image
              {...image}
              alt="AI generated image"
              class="max-w-md rounded-lg border shadow-sm"
            />
          {/each}
        {/if}
        <p>{message.content}</p>
      </div>
    {/if}
  {/each}
</div>

<form onsubmit={handleSubmit}>
  <input bind:value={input} placeholder="Ask AI to generate an image..." />
  <button type="submit">Send</button>
</form>`}
			/>

			<!-- Examples -->
			<Subheading>Examples</Subheading>

			<h3 class="mb-2 text-base font-semibold">Custom Styling</h3>
			<p class="text-muted-foreground mb-4">
				You can easily customize the appearance of images using Tailwind classes:
			</p>

			<CodeNameBlock
				filename="custom-styling.svelte"
				lang="svelte"
				code={`<!-- Square thumbnail -->
<Image
  {...generatedImage}
  alt="Square thumbnail"
  class="h-32 w-32 object-cover"
/>

<!-- Full width with custom border -->
<Image
  {...generatedImage}
  alt="Full width image"
  class="w-full rounded-xl border-2 border-primary"
/>

<!-- With shadow and hover effect -->
<Image
  {...generatedImage}
  alt="Interactive image"
  class="transition-transform hover:scale-105 shadow-lg"
/>`}
			/>

			<h3 class="mt-6 mb-2 text-base font-semibold">Responsive Gallery</h3>
			<p class="text-muted-foreground mb-4">
				Create a responsive image gallery with generated images:
			</p>

			<CodeNameBlock
				filename="responsive-gallery.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Image } from '$lib/components/ai-elements/image/index.js';

  let images = [
    { base64: "...", mediaType: "image/png" },
    { base64: "...", mediaType: "image/png" },
    { base64: "...", mediaType: "image/png" },
  ];
\<\/script\>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each images as image, i}
    <Image
      {...image}
      alt={\`Generated image \${i + 1}\`}
      class="w-full h-48 object-cover rounded-lg"
    />
  {/each}
</div>`}
			/>

			<!-- Accessibility -->
			<Subheading>Accessibility</Subheading>

			<p class="text-muted-foreground mb-4">
				Always provide meaningful <code class="text-sm">alt</code> text for images to ensure
				your application is accessible to all users:
			</p>

			<CodeNameBlock
				filename="accessibility-example.svelte"
				lang="svelte"
				code={`<!-- Good: Descriptive alt text -->
<Image
  {...generatedImage}
  alt="A serene mountain landscape at sunset with orange and pink clouds"
/>

<!-- Avoid: Empty or generic alt text -->
<Image
  {...generatedImage}
  alt="image"
/>`}
			/>

			<!-- Notes -->
			<Subheading>Notes</Subheading>

			<ul class="text-muted-foreground list-inside list-disc space-y-2">
				<li>
					The component constructs a data URL using the format: <code class="text-sm"
						>data:{`{mediaType}`};base64,{`{base64}`}</code
					>
				</li>
				<li>
					Base64 encoded images are embedded directly in the HTML, which may increase page
					size for large images
				</li>
				<li>
					Consider using lazy loading for multiple images: <code class="text-sm"
						>loading="lazy"</code
					>
				</li>
				<li>
					The component supports all standard HTML image attributes through the spread
					operator
				</li>
				<li>
					Use proper <code class="text-sm">mediaType</code> values for best browser compatibility:
					"image/png", "image/jpeg", "image/webp", "image/gif", etc.
				</li>
			</ul>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Image -->
			<ComponentAPITable
				componentName="Image"
				props={imageProps}
				class="mt-6"
				id="image-props"
			/>
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
