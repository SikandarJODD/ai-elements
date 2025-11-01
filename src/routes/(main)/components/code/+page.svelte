<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, ComponentAPITable } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import Heading from "$lib/components/docs/heading.svelte";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();
	// Component API Props Data
	const codeProps = [
		{
			name: "code",
			type: "string",
			description: "The code string to syntax highlight and display (required)",
		},
		{
			name: "lang",
			type: "SupportedLanguage",
			default: "'typescript'",
			description: "Programming language for syntax highlighting",
		},
		{
			name: "variant",
			type: "'default' | 'ghost'",
			default: "'default'",
			description: "Visual style variant of the code block",
		},
		{
			name: "hideLines",
			type: "boolean",
			default: "false",
			description: "Whether to hide line numbers",
		},
		{
			name: "highlight",
			type: "(number | [number, number])[]",
			default: "[]",
			description: "Array of line numbers or ranges to highlight (e.g., [1, [3, 5], 7])",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the code container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically CodeCopyButton or CodeOverflow)",
		},
		{
			name: "ref",
			type: "HTMLDivElement",
			description: "Bindable reference to the code container element",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const codeCopyButtonProps = [
		{
			name: "variant",
			type: "ButtonProps['variant']",
			default: "'ghost'",
			description: "Button variant style",
		},
		{
			name: "size",
			type: "ButtonProps['size']",
			default: "'icon'",
			description: "Button size",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the copy button",
		},
		{
			name: "ref",
			type: "HTMLButtonElement",
			description: "Bindable reference to the button element",
		},
		{
			name: "...restProps",
			type: "CopyButtonProps",
			description: "All other CopyButton component props are supported",
		},
	];

	const codeOverflowProps = [
		{
			name: "collapsed",
			type: "boolean",
			default: "true",
			description: "Whether the code block is collapsed (bindable)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the overflow container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Code content to render with overflow control",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	import CodeNameBlock from "$lib/components/docs/code-name/code-name-block.svelte";
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">CodeBlock</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>CodeBlock</CodeSpan> component provides syntax highlighting, line numbers,
				and copy to clipboard functionality for code blocks.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/code.json`}
				is_jsrepo={true}
				blockname="code"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`<\script lang="ts"\>
	 import * as Code from "$lib/components/ai-elements/code/index.js";
<\/script\>

<Code.Root lang="svelte" class="w-full" {code} hideLines>
    <Code.CopyButton />
</Code.Root>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple code generation tool using the <CodeSpan>streamObject</CodeSpan> function
				from the AI SDK.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`<\script lang="ts"\>
  import { type UIMessage } from "ai";
  import * as Code from "$lib/components/ai-elements/code/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";

  let input = $state("");
  let isLoading = $state(false);
  let codeObject = $state<{
    language?: string;
    filename?: string;
    code?: string;
  }>({});

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!input.trim()) return;

    isLoading = true;
    codeObject = {};

    try {
      const response = await fetch("/api/codegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\\n");

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const jsonStr = line.slice(2);
                const parsed = JSON.parse(jsonStr);
                codeObject = { ...codeObject, ...parsed };
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isLoading = false;
    }
  }
<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-auto mb-4">
      {#if codeObject.code && codeObject.language}
        <Code.Root
          lang={codeObject.language}
          code={codeObject.code}
          showLineNumbers={true}
        >
          <Code.CopyButton />
        </Code.Root>
      {/if}
    </div>

    <Input onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
      <PromptInputTextarea
        bind:value={input}
        placeholder="Generate a Svelte todolist component"
        onchange={(e) => (input = e.currentTarget.value)}
        class="pr-12"
      />
      <PromptInputSubmit
        status={isLoading ? "streaming" : "ready"}
        disabled={!input.trim()}
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
					filename="api/codegen/+server.ts"
					lang="typescript"
					code={`import { streamObject } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import { z } from "zod";
import type { RequestHandler } from "./$types";

export const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
});

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  const result = streamObject({
    model: openrouter(defaultModel),
    schema: codeBlockSchema,
    prompt:
      \`You are a helpful coding assistant. Only generate code, no markdown formatting or backticks, or text. \` +
      prompt,
  });

  return result.toTextStreamResponse();
};`}
				/>
			</div>

			<Subheading>Features</Subheading>

			<ul class="mb-6 list-disc space-y-2 pl-6 text-sm sm:text-base">
				<li>Syntax highlighting with Shiki</li>
				<li>Line numbers (optional)</li>
				<li>Copy to clipboard functionality</li>
				<li>Automatic light/dark theme switching</li>
				<li>Customizable styles</li>
				<li>Accessible design</li>
			</ul>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Code -->
			<ComponentAPITable
				componentName="Code"
				props={codeProps}
				class="mt-6"
				id="code-props"
			/>

			<!-- CodeCopyButton -->
			<ComponentAPITable
				componentName="CodeCopyButton"
				props={codeCopyButtonProps}
				id="code-copy-button-props"
			/>

			<!-- CodeOverflow -->
			<ComponentAPITable
				componentName="CodeOverflow"
				props={codeOverflowProps}
				id="code-overflow-props"
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
