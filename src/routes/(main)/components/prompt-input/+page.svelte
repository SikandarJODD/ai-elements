<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
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
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/prompt-input/llms.txt`;
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
				The <CodeSpan>Prompt Input</CodeSpan> component allows a user to send a message with file
				attachments to a large language model. It includes a textarea, file upload capabilities,
				a submit button, and a dropdown for selecting the model.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Prompt Input" {llmsTxtUrl} type="ai-elements" />
			</div>

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
  import GlobeIcon from "$lib/components/ai-elements/prompt-input/GlobeIcon.svelte";
  import MicIcon from "$lib/components/ai-elements/prompt-input/MicIcon.svelte";

  let handleSubmit = async (
    message: PromptInputMessage,
    event: SubmitEvent,
  ) => {
    console.log("Submitted:", message);
  };

  let models = [
    { id: "mistralai/devstral-2512:free", name: "MistralAI Devstral 2512" },
    { id: "qwen/qwen3-coder:free", name: "Qwen 3 Coder" },
    {
      id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
      name: "Dolphin Mistral 24B Venice Edition",
    },
  ];

  let model = $state("");
  let status = $state<ChatStatus>("idle");
\<\/script\>

<div class="max-w-xl mx-auto py-10 min-h-dvh">
  <PromptInput globalDrop multiple onSubmit={handleSubmit} class="shadow-none">
    <PromptInputBody>
      <PromptInputAttachments>
        {#snippet children(attachment)}
          <PromptInputAttachment data={attachment} />
        {/snippet}
      </PromptInputAttachments>
      <PromptInputTextarea  />
    </PromptInputBody>
    <PromptInputToolbar>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
              ><path
                d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"
              ></path></svg
            >
          </PromptInputActionMenuTrigger>
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton>
          <!-- <MicIcon size={16} /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            ><path
              d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"
            ></path></svg
          >
        </PromptInputButton>
        <PromptInputButton size="default">
          <!-- <GlobeIcon size={16} /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            ><path
              d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"
            ></path></svg
          >
          <span>Search</span>
        </PromptInputButton>
        <PromptInputModelSelect bind:value={model}>
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue
              value={model}
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
  </PromptInput>
</div>`}
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
    type ChatStatus,
  } from "$lib/components/ai-elements/prompt-input/index.js";

  let chat = new Chat({});

  let handleSubmit = async (message: PromptInputMessage) => {
    console.log("Submitted:", message.text);
    chat.sendMessage({ text: message.text || "" });
  };

  let models = [
    { id: "mistralai/devstral-2512:free", name: "MistralAI Devstral 2512" },
    { id: "qwen/qwen3-coder:free", name: "Qwen 3 Coder" },
    {
      id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
      name: "Dolphin Mistral 24B Venice Edition",
    },
  ];

  let model = $state("");
  let model_name = $derived.by(() => {
    if (model) {
      return models.find((modelOption) => modelOption.id === model)?.name;
    }
    return "Select Model";
  });
  let status = $state<ChatStatus>("idle");
\<\/script\>

<div class="max-w-xl mx-auto py-10 min-h-dvh">
  <PromptInput globalDrop multiple onSubmit={handleSubmit} class="shadow-none">
    <PromptInputBody>
      <PromptInputAttachments>
        {#snippet children(attachment)}
          <PromptInputAttachment data={attachment} />
        {/snippet}
      </PromptInputAttachments>
      <PromptInputTextarea />
    </PromptInputBody>
    <PromptInputToolbar>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
              ><path
                d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"
              ></path></svg
            >
          </PromptInputActionMenuTrigger>
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton>
          <!-- <MicIcon size={16} /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            ><path
              d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"
            ></path></svg
          >
        </PromptInputButton>
        <PromptInputButton size="default">
          <!-- <GlobeIcon size={16} /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            ><path
              d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"
            ></path></svg
          >
          <span>Search</span>
        </PromptInputButton>
        <PromptInputModelSelect bind:value={model}>
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
  </PromptInput>

  <main class="p-4">
    <ul>
      {#each chat.messages as message, messageIndex (messageIndex)}
        <li>
          <div>{message.role}</div>
          <div>
            {#each message.parts as part, partIndex (partIndex)}
              {#if part.type === "text"}
                <div>{part.text}</div>
              {/if}
            {/each}
          </div>
        </li>
      {/each}
    </ul>
  </main>
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
					code={`import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { openrouter, defaultModel } from '$lib/ai/config';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { messages, model }: { messages: UIMessage[], model: string } = await request.json();

  let model_name = model || defaultModel;
  const result = streamText({
    model: openrouter(model_name),
    messages: await convertToModelMessages(messages),
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

			<AiElementsPrevNext currentSlug="prompt-input" />
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
