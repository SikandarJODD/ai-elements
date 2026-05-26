<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { CodeChip, H1, H2, Paragraph } from "$lib/components/docs/markdown";
	import { SingleFile } from "$lib/components/ui/code";

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

<!-- File upload input -->
<input
  type="file"
  accept=".pdf"
  onchange={(e) => files = e.currentTarget.files}
/>

{#if files?.length}
  <div class="text-green-600">ðŸ“„ {files[0].name} ready</div>
{/if}

<form onsubmit={handleSubmit} class="flex gap-2">
  <input bind:value={input} placeholder="Ask about the PDF..." />
  <button type="submit" disabled={chat.status === "streaming"}>
    {chat.status === "streaming" ? "..." : "Send"}
  </button>
</form>

<!-- Render messages -->
{#if chat.messages.length > 0}
  <div class="space-y-3">
    {#each chat.messages as message}
      <div class="text-sm">
        <span class="font-medium">
          {message.role === "user" ? "User" : "Assistant"}:
        </span>
        {#each message.parts as part}
          {#if part.type === "text"}
            <span class="whitespace-pre-wrap">{part.text}</span>
          {:else if part.type === "file"}
            <span class="text-muted-foreground">[PDF: {part.filename}]</span>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
{/if}`;

	let serverCode = `import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { json } from "@sveltejs/kit";

// Using GPT-5-Nano which supports document understanding
let defaultModel = "openai/gpt-5-nano";

export const POST = async ({ request }) => {
  const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } =
    await request.json();

  // Require API key from user
  if (!apiKey) {
    return json(
      { error: "OpenRouter API key is required." },
      { status: 401 }
    );
  }

  const openrouter = createOpenRouter({
    apiKey: apiKey,
  });

  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant. Response in 100 words.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: false,
  });
};`;
</script>

<MetaTags
	title="Chat with PDFs - Svelte Cookbook"
	description="Build an AI assistant that can read and answer questions about PDF documents."
	openGraph={{
		title: "Chat with PDFs - Svelte Cookbook",
		description: "Build an AI assistant that reads and answers questions about PDF documents.",
		type: "article",
		url: "https://svelte-ai-elements.vercel.app/cookbook/chat-with-pdfs",
	}}
/>

<article class="mx-auto px-4 py-8 md:px-6 md:py-10">
	<header class="mb-12">
		<div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
			<H1 id="chat-with-pdfs" class="text-3xl font-semibold tracking-tight sm:text-4xl">
				Chat with PDFs
			</H1>
			<CopyPageDropdown class="shrink-0" componentName="Chat with PDFs" {llmsTxtUrl} />
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Documents</Badge>
			<Badge variant="secondary">File Upload</Badge>
			<Badge variant="secondary">Vision</Badge>
		</div>

		<Paragraph class="mt-0 text-base sm:text-lg">
			Upload PDF documents and have a conversation about their content. The AI reads the
			document and answers questions based on what it finds.
		</Paragraph>
	</header>

	<section class="mb-12">
		<H2 id="demo" class="mb-6 text-3xl font-semibold">Demo</H2>
		<Paragraph class="mb-4 mt-0 text-sm">Upload a PDF and ask questions about it!</Paragraph>
		<Demo />
	</section>

	<section class="mb-16">
		<H2 id="convert-files-to-data-urls" class="mb-6 text-3xl font-semibold">
			Convert Files to Data URLs
		</H2>
		<Paragraph class="mb-6 mt-0">
			The <CodeChip>FileReader</CodeChip> API converts uploaded files into base64 data URLs that
			can be sent to the AI model.
		</Paragraph>
		<SingleFile
			code={{
				code: convertCode,
				name: "utils.ts",
				lang: "typescript",
			}}
		/>
	</section>

	<section class="mb-16">
		<H2 id="client-component" class="mb-6 text-3xl font-semibold">Client Component</H2>
		<Paragraph class="mb-6 mt-0">
			Send both text and file parts in a single message. The <CodeChip>parts</CodeChip> array can
			contain multiple content types.
		</Paragraph>
		<SingleFile
			code={{
				code: clientCode,
				name: "+page.svelte",
				lang: "svelte",
			}}
		/>
	</section>

	<section class="mb-10">
		<H2 id="server-endpoint" class="mb-6 text-3xl font-semibold">Server Endpoint</H2>
		<Paragraph class="mb-6 mt-0">
			Uses a model that supports document understanding. The
			<CodeChip>convertToModelMessages</CodeChip> handles the multi-part format.
		</Paragraph>
		<SingleFile
			code={{
				code: serverCode,
				name: "/+server.ts",
				lang: "typescript",
			}}
		/>
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/chat-with-pdfs"
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
		<CookbookPrevNext currentSlug="chat-with-pdfs" />
	</footer>
</article>
