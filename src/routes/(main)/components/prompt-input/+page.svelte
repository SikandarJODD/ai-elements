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
	// Note: Icon components (GlobeIcon, ImageIcon, Loader2Icon, MicIcon, PaperclipIcon, PlusIcon, SendIcon, SquareIcon, XIcon) are excluded as requested

	const promptInputProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the form container",
		},
		{
			name: "accept",
			type: "string",
			description: "File types to accept (e.g., 'image/*' or leave undefined for any)",
		},
		{
			name: "multiple",
			type: "boolean",
			description: "Whether to allow multiple file uploads",
		},
		{
			name: "globalDrop",
			type: "boolean",
			description: "When true, accepts drops anywhere on document. Default false (opt-in)",
		},
		{
			name: "syncHiddenInput",
			type: "boolean",
			description:
				"When true, renders a hidden input with given name and keeps it in sync for native form posts. Default false",
		},
		{
			name: "clearOnSubmit",
			type: "boolean",
			default: "true",
			description: "When true, automatically clears attachments after successful submission",
		},
		{
			name: "maxFiles",
			type: "number",
			description: "Maximum number of files allowed",
		},
		{
			name: "maxFileSize",
			type: "number",
			description: "Maximum file size in bytes",
		},
		{
			name: "onError",
			type: "(err: { code: 'max_files' | 'max_file_size' | 'accept'; message: string }) => void",
			description: "Error handler for file validation errors",
		},
		{
			name: "onSubmit",
			type: "(message: PromptInputMessage, event: SubmitEvent) => void | Promise<void>",
			description: "Submit handler called when the form is submitted",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically PromptInputBody, PromptInputToolbar)",
		},
	];

	const promptInputActionAddAttachmentsProps = [
		{
			name: "label",
			type: "string",
			default: '"Add photos or files"',
			description: "Label text for the menu item",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the menu item",
		},
	];

	const promptInputActionMenuProps = [
		{
			name: "open",
			type: "boolean",
			description: "Whether the dropdown menu is open (bindable)",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Menu content (typically PromptInputActionMenuTrigger and PromptInputActionMenuContent)",
		},
	];

	const promptInputActionMenuContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the dropdown content",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Menu items (typically PromptInputActionMenuItem components)",
		},
	];

	const promptInputActionMenuItemProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the menu item",
		},
		{
			name: "onSelect",
			type: "(event: Event) => void",
			description: "Handler called when the menu item is selected",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Menu item content",
		},
	];

	const promptInputActionMenuTriggerProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the trigger button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Trigger content (defaults to PlusIcon if not provided)",
		},
	];

	const promptInputAttachmentProps = [
		{
			name: "data",
			type: "FileWithId",
			description: "File data object containing id, filename, mediaType, and url",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the attachment container",
		},
	];

	const promptInputAttachmentsProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the attachments container",
		},
		{
			name: "children",
			type: "Snippet<[FileWithId]>",
			description: "Render function for each attachment (receives file data)",
		},
	];

	const promptInputBodyProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the body container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Body content (typically PromptInputTextarea and PromptInputAttachments)",
		},
	];

	const promptInputButtonProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Button content",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			description: "Size of the button (auto-calculated based on children if not provided)",
		},
	];

	const promptInputModelSelectProps = [
		{
			name: "value",
			type: "string",
			description: "Currently selected model value (bindable)",
		},
		{
			name: "onValueChange",
			type: "(value: string | undefined) => void",
			description: "Callback when the selected value changes",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Select content (typically PromptInputModelSelectTrigger and PromptInputModelSelectContent)",
		},
	];

	const promptInputModelSelectContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the select dropdown content",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Select items (typically PromptInputModelSelectItem components)",
		},
	];

	const promptInputModelSelectItemProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the select item",
		},
		{
			name: "value",
			type: "string",
			description: "Value of the select item",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Item content",
		},
	];

	const promptInputModelSelectTriggerProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the select trigger",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Trigger content (typically PromptInputModelSelectValue)",
		},
	];

	const promptInputModelSelectValueProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the value display",
		},
		{
			name: "placeholder",
			type: "string",
			description: "Placeholder text when no value is selected",
		},
		{
			name: "value",
			type: "string",
			description: "Current selected value to display",
		},
	];

	const promptInputProviderProps = [
		{
			name: "initialInput",
			type: "string",
			default: '""',
			description: "Initial input value for the textarea",
		},
		{
			name: "accept",
			type: "string",
			description: "File types to accept for attachments",
		},
		{
			name: "multiple",
			type: "boolean",
			default: "true",
			description: "Whether to allow multiple file uploads",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Provider content",
		},
	];

	const promptInputSubmitProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the submit button",
		},
		{
			name: "status",
			type: "ChatStatus",
			description:
				"Current chat status ('submitted', 'streaming', 'error', or undefined) - changes the icon displayed",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom button content (defaults to status-based icon if not provided)",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'default'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'icon'",
			description: "Size of the button",
		},
	];

	const promptInputTextareaProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the textarea",
		},
		{
			name: "placeholder",
			type: "string",
			default: '"What would you like to know?"',
			description: "Placeholder text for the textarea",
		},
		{
			name: "value",
			type: "string",
			description: "Current textarea value (bindable)",
		},
		{
			name: "onchange",
			type: "(event: Event) => void",
			description: "Change event handler",
		},
	];

	const promptInputToolbarProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the toolbar container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Toolbar content (typically PromptInputTools and PromptInputSubmit)",
		},
	];

	const promptInputToolsProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the tools container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Tool buttons (typically PromptInputButton or PromptInputActionMenu)",
		},
	];

	// Note: Icon components (SendIcon, SquareIcon, XIcon) are excluded as requested

	import { CodeNameBlock } from "$lib/components/docs";
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Prompt Input</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Prompt Input</CodeSpan> component allows a user to send a message with
				file attachments to a large language model. It includes a textarea, file upload capabilities,
				a submit button, and a dropdown for selecting the model.
			</p>

			<Playground code={examples.basic.code}>
				<div class="w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/prompt-input.json`}
				is_jsrepo={true}
				blockname="prompt-input"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    type PromptInputMessage,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    type ChatStatus,
  } from "$lib/components/ai-elements/prompt-input/index.js";
\<\/script\>

<PromptInput globalDrop multiple onSubmit={handleSubmit}>
    <PromptInputBody>
      <PromptInputAttachments>
        {#snippet children(attachment)}
          <PromptInputAttachment data={attachment} />
        {/snippet}
      </PromptInputAttachments>
      <PromptInputTextarea
        bind:value={text}
        onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
      />
    </PromptInputBody>
    <PromptInputToolbar>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger />
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton>
          <MicIcon size={16} />
        </PromptInputButton>
        <PromptInputButton size="default">
          <GlobeIcon size={16} />
          <span>Search</span>
        </PromptInputButton>
        <PromptInputModelSelect
          bind:value={model}
          onValueChange={(value) => {
            if (value) {
              model = value;
              const selectedModel = models.find((m) => m.id === model);
              model_name = selectedModel ? selectedModel.name : "";
            }
          }}
        >
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue
              value={model_name}
              placeholder="Select Model"
            />
          </PromptInputModelSelectTrigger>
          <PromptInputModelSelectContent>
            {#each models as modelOption (modelOption.id)}
              <PromptInputModelSelectItem value={modelOption.id}>
                {modelOption.name}
              </PromptInputModelSelectItem>
            {/each}
          </PromptInputModelSelectContent>
        </PromptInputModelSelect>
      </PromptInputTools>
      <PromptInputSubmit {status} />
    </PromptInputToolbar>
</PromptInput>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a fully functional chat app using <CodeSpan>PromptInput</CodeSpan>,
				<a href="/components/conversation" class="text-primary font-medium hover:underline">
					Conversation
				</a> with a model picker:
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
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    type PromptInputMessage,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";
  import { MicIcon, GlobeIcon } from "lucide-svelte";

  const models = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-opus-4-20250514", name: "Claude 4 Opus" },
  ];

  let text = $state<string>("");
  let model = $state<string>(models[0].id);
  let useMicrophone = $state<boolean>(false);
  let useWebSearch = $state<boolean>(false);

  let chat = new Chat({});

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    chat.sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: useWebSearch,
        },
      }
    );
    text = "";
  };
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
                  <Response>
                    {part.text}
                  </Response>
                {/if}
              {/each}
            </MessageContent>
          </Message>
        {/each}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <PromptInput onSubmit={handleSubmit} class="mt-4" globalDrop multiple>
      <PromptInputBody>
        <PromptInputAttachments>
          {#snippet children(attachment)}
            <PromptInputAttachment data={attachment} />
          {/snippet}
        </PromptInputAttachments>
        <PromptInputTextarea
          bind:value={text}
          onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
        />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputButton
            onclick={() => (useMicrophone = !useMicrophone)}
            variant={useMicrophone ? "default" : "ghost"}
          >
            <MicIcon size={16} />
            <span class="sr-only">Microphone</span>
          </PromptInputButton>
          <PromptInputButton
            onclick={() => (useWebSearch = !useWebSearch)}
            variant={useWebSearch ? "default" : "ghost"}
          >
            <GlobeIcon size={16} />
            <span class="sr-only">Web Search</span>
          </PromptInputButton>
          <PromptInputModelSelect
            bind:value={model}
            onValueChange={(value) => {
              if (value) {
                model = value;
              }
            }}
          >
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue placeholder="Select model" />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {#each models as modelOption (modelOption.id)}
                <PromptInputModelSelectItem value={modelOption.id}>
                  {modelOption.name}
                </PromptInputModelSelectItem>
              {/each}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
        <PromptInputSubmit
          status={chat.status === "streaming" ? "streaming" : "ready"}
        />
      </PromptInputToolbar>
    </PromptInput>
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
  const {
    model,
    messages,
    webSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch?: boolean;
  } = await request.json();

  const result = streamText({
    model: webSearch ? "perplexity/sonar" : model,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed sm:text-base">
				<li>Auto-resizing textarea that adjusts height based on content</li>
				<li>File attachment support with drag-and-drop</li>
				<li>Image preview for image attachments</li>
				<li>Configurable file constraints (max files, max size, accepted types)</li>
				<li>Automatic submit button icons based on status</li>
				<li>Support for keyboard shortcuts (Enter to submit, Shift+Enter for new line)</li>
				<li>Customizable min/max height for the textarea</li>
				<li>Flexible toolbar with support for custom actions and tools</li>
				<li>Built-in model selection dropdown</li>
				<li>Responsive design with mobile-friendly controls</li>
				<li>Clean, modern styling with customizable themes</li>
				<li>Form-based submission handling</li>
				<li>Hidden file input sync for native form posts</li>
				<li>Global document drop support (opt-in)</li>
			</ul>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- PromptInput -->
			<ComponentAPITable
				componentName="PromptInput"
				props={promptInputProps}
				class="mt-6"
				id="prompt-input-props"
			/>

			<!-- PromptInputProvider -->
			<ComponentAPITable
				componentName="PromptInputProvider"
				props={promptInputProviderProps}
				id="prompt-input-provider-props"
			/>

			<!-- PromptInputBody -->
			<ComponentAPITable
				componentName="PromptInputBody"
				props={promptInputBodyProps}
				id="prompt-input-body-props"
			/>

			<!-- PromptInputTextarea -->
			<ComponentAPITable
				componentName="PromptInputTextarea"
				props={promptInputTextareaProps}
				id="prompt-input-textarea-props"
			/>

			<!-- PromptInputAttachments -->
			<ComponentAPITable
				componentName="PromptInputAttachments"
				props={promptInputAttachmentsProps}
				id="prompt-input-attachments-props"
			/>

			<!-- PromptInputAttachment -->
			<ComponentAPITable
				componentName="PromptInputAttachment"
				props={promptInputAttachmentProps}
				id="prompt-input-attachment-props"
			/>

			<!-- PromptInputToolbar -->
			<ComponentAPITable
				componentName="PromptInputToolbar"
				props={promptInputToolbarProps}
				id="prompt-input-toolbar-props"
			/>

			<!-- PromptInputTools -->
			<ComponentAPITable
				componentName="PromptInputTools"
				props={promptInputToolsProps}
				id="prompt-input-tools-props"
			/>

			<!-- PromptInputButton -->
			<ComponentAPITable
				componentName="PromptInputButton"
				props={promptInputButtonProps}
				id="prompt-input-button-props"
			/>

			<!-- PromptInputSubmit -->
			<ComponentAPITable
				componentName="PromptInputSubmit"
				props={promptInputSubmitProps}
				id="prompt-input-submit-props"
			/>

			<!-- PromptInputActionMenu -->
			<ComponentAPITable
				componentName="PromptInputActionMenu"
				props={promptInputActionMenuProps}
				id="prompt-input-action-menu-props"
			/>

			<!-- PromptInputActionMenuTrigger -->
			<ComponentAPITable
				componentName="PromptInputActionMenuTrigger"
				props={promptInputActionMenuTriggerProps}
				id="prompt-input-action-menu-trigger-props"
			/>

			<!-- PromptInputActionMenuContent -->
			<ComponentAPITable
				componentName="PromptInputActionMenuContent"
				props={promptInputActionMenuContentProps}
				id="prompt-input-action-menu-content-props"
			/>

			<!-- PromptInputActionMenuItem -->
			<ComponentAPITable
				componentName="PromptInputActionMenuItem"
				props={promptInputActionMenuItemProps}
				id="prompt-input-action-menu-item-props"
			/>

			<!-- PromptInputActionAddAttachments -->
			<ComponentAPITable
				componentName="PromptInputActionAddAttachments"
				props={promptInputActionAddAttachmentsProps}
				id="prompt-input-action-add-attachments-props"
			/>

			<!-- PromptInputModelSelect -->
			<ComponentAPITable
				componentName="PromptInputModelSelect"
				props={promptInputModelSelectProps}
				id="prompt-input-model-select-props"
			/>

			<!-- PromptInputModelSelectTrigger -->
			<ComponentAPITable
				componentName="PromptInputModelSelectTrigger"
				props={promptInputModelSelectTriggerProps}
				id="prompt-input-model-select-trigger-props"
			/>

			<!-- PromptInputModelSelectValue -->
			<ComponentAPITable
				componentName="PromptInputModelSelectValue"
				props={promptInputModelSelectValueProps}
				id="prompt-input-model-select-value-props"
			/>

			<!-- PromptInputModelSelectContent -->
			<ComponentAPITable
				componentName="PromptInputModelSelectContent"
				props={promptInputModelSelectContentProps}
				id="prompt-input-model-select-content-props"
			/>

			<!-- PromptInputModelSelectItem -->
			<ComponentAPITable
				componentName="PromptInputModelSelectItem"
				props={promptInputModelSelectItemProps}
				id="prompt-input-model-select-item-props"
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
