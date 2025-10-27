<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CodeNameBlock } from "$lib/components/docs";
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
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0 space-y-8" bind:this={toc.ref}>
			<div class="space-y-4">
				<Subheading class="md:text-3xl">Response</Subheading>

				<p class="!text-muted-foreground text-lg leading-relaxed">
					The Response component renders a Markdown response from a large language model.
					It uses Streamdown under the hood to render the markdown.
				</p>

				<div data-toc-index={false} class="mt-6">
					<Playground code={examples.basic.code} replay>
						<div class="dark-scrollbar max-h-[500px] w-full overflow-y-auto">
							<examples.basic.Component />
						</div>
					</Playground>
				</div>
			</div>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<div class="mt-8">
				<Installation
					specifier={`${PUBLIC_WEBSITE_URL}/r/response.json`}
					is_jsrepo={true}
					blockname="response"
				/>
			</div>

			<!-- CSS Configuration -->
			<div class="space-y-4">
				<Subheading>CSS Configuration</Subheading>

				<p class="!text-muted-foreground leading-relaxed">
					Add the following imports to your <CodeSpan>app.css</CodeSpan> file to include Tailwind
					CSS and Streamdown styles:
				</p>

				<div class="mt-4">
					<Code
						lang="css"
						code={`@import 'tailwindcss';
/* Add Streamdown styles to your Tailwind build */
@source "../node_modules/svelte-streamdown/**/*";`}
					/>
				</div>
			</div>

			<!-- Usage -->
			<div class="space-y-4">
				<Subheading>Usage</Subheading>

				<div class="mt-4">
					<Code
						lang="svelte"
						code={`\<script lang="ts"\>
	 import { Response } from "$lib/components/ai-elements/response/index.js";
   let content = "# Hello, World!\\nThis is a sample response from a large language model.";
\<\/script\>

<Response {content} />`}
					/>
				</div>
			</div>

			<!-- Usage with AI SDK -->
			<div class="space-y-4">
				<Subheading>Usage with AI SDK</Subheading>

				<p class="!text-muted-foreground leading-relaxed">
					Populate a markdown response with messages from <CodeSpan>Chat</CodeSpan>.
				</p>

				<p class="mb-4 text-sm leading-relaxed sm:text-base">
					Add the following component to your frontend:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="+page.svelte"
						lang="svelte"
						code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton
  } from "$lib/components/ai-elements/conversation/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";

  let chat = new Chat({});
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <Conversation>
      <ConversationContent>
        {#each chat.messages as message (message.id)}
          <Message from={message.role}>
            <MessageContent>
              {#each message.parts as part, i (i)}
                {#if part.type === "text"}
                  <Response content={part.text} />
                {/if}
              {/each}
            </MessageContent>
          </Message>
        {/each}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
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
						code={`import { streamText, type UIMessage, convertToModelMessages } from "ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: "openai/gpt-4o", // or your preferred model
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
					/>
				</div>
			</div>

			<!-- Features -->
			<div class="space-y-4">
				<Subheading>Features</Subheading>

				<ul
					class="!text-muted-foreground list-inside list-disc space-y-3 text-sm leading-relaxed sm:text-base"
				>
					<li>
						Renders markdown content with support for paragraphs, links, and code blocks
					</li>
					<li>
						Supports GFM features like tables, task lists, and strikethrough text via <CodeSpan
							>remark-gfm</CodeSpan
						>
					</li>
					<li>
						Supports rendering Math Equations via <CodeSpan>rehype-katex</CodeSpan>
					</li>
					<li>
						Smart streaming support - automatically completes incomplete formatting
						during real-time text streaming
					</li>
					<li>
						Code blocks are rendered with syntax highlighting for various programming
						languages
					</li>
					<li>Code blocks include a button to easily copy code to clipboard</li>
					<li>Adapts to different screen sizes while maintaining readability</li>
					<li>Seamlessly integrates with both light and dark themes</li>
					<li>
						Customizable appearance through className props and Tailwind CSS utilities
					</li>
					<li>Built with accessibility in mind for all users</li>
				</ul>
			</div>
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
