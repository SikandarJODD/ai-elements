<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/chat-with-pdfs/llms.txt`;

	let convertCode = `// Convert uploaded files to data URLs for the AI
async function convertFilesToDataURLs(files: FileList) {
  return Promise.all(
    Array.from(files).map((file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            type: "file",
            filename: file.name,
            mediaType: file.type,
            url: reader.result as string  // Base64 data URL
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    )
  );
}`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let chat = new Chat({
    transport: new DefaultChatTransport({
      api: "/api/cookbook/chat-with-pdf"
    })
  });

  let input = $state("");
  let files = $state<FileList | undefined>();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // Convert files to data URLs
    const fileParts = files?.length 
      ? await convertFilesToDataURLs(files) 
      : [];

    // Send message with text AND file parts
    chat.sendMessage({
      role: "user",
      parts: [
        { type: "text", text: input },
        ...fileParts
      ]
    });

    input = "";
    files = undefined;
  }
<\/script>

<input type="file" accept=".pdf" />`;

	let serverCode = `import { streamText, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Using GPT-5-Nano which supports document understanding
let defaultModel = "openai/gpt-5-nano";

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
};`;
</script>

<MetaTags
	title="Chat with PDFs - Svelte Cookbook"
	description="Build an AI assistant that can read and answer questions about PDF documents."
	openGraph={{
		title: "Chat with PDFs - Svelte Cookbook",
		description: "Build an AI assistant that reads and answers questions about PDF documents.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/chat-with-pdfs",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Chat with PDFs</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Chat with PDFs" {llmsTxtUrl} type="ai-elements" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Documents</Badge>
			<Badge variant="secondary">File Upload</Badge>
			<Badge variant="secondary">Vision</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Upload PDF documents and have a conversation about their content. The AI reads the
			document and answers questions based on what it finds.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Upload a PDF and ask questions about it!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Convert Files to Data URLs</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The <code class="text-foreground">FileReader</code> API converts uploaded files into base64 data
			URLs that can be sent to the AI model.
		</p>
		<CodeNameBlock filename="utils.ts" lang="typescript" code={convertCode} highlight={[[4, 16]]} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Send both text and file parts in a single message. The
			<code class="text-foreground">parts</code> array can contain multiple content types.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[[22, 28]]} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Uses a model that supports document understanding. The
			<code class="text-foreground">convertToModelMessages</code> handles the multi-part format.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} highlight={[[4, 4]]} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/chat-with-pdfs"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="chat-with-pdfs" />
	</footer>
</article>

