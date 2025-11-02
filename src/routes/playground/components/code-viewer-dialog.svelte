<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Code from "$lib/components/ai-elements/code";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import AiInstallCommand from "$lib/components/docs/ai-install-command.svelte";
	import SvelteLogo from "$lib/components/icons/svelte.svelte";
	import TypeScriptLogo from "$lib/components/icons/typescript.svelte";
	import { FileText, FileJson, Settings } from "@lucide/svelte";

	type Props = {
		open: boolean;
	};

	let { open = $bindable(false) }: Props = $props();

	// Code snippets for each file
	const pageCode = `<script lang="ts">
	import { DefaultChatTransport } from "ai";
	import { Chat } from "@ai-sdk/svelte";
	import { watch } from "runed";
	import { onMount } from "svelte";
	import {
		PlusIcon,
		Code,
		InfoIcon,
		Copy,
		RefreshCcw,
		ThumbsUp,
		ThumbsDown,
		Brain,
		ArrowUp as ArrowUpIcon,
		Key as KeyIcon,
		Trash2 as Trash2Icon,
		FileText,
		Palette,
		Search,
	} from "@lucide/svelte";

	// UI Components
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as HoverCard from "$lib/components/ui/hover-card";

	// AI Elements Components
	import { Message, MessageContent } from "$lib/components/ai-elements/message";
	import {
		Conversation,
		ConversationContent,
		ConversationScrollButton,
	} from "$lib/components/ai-elements/conversation";
	import { Actions, Action } from "$lib/components/ai-elements/action";
	import { Response } from "$lib/components/ai-elements/response";
	import {
		Reasoning,
		ReasoningTrigger,
		ReasoningContent,
	} from "$lib/components/ai-elements/reasoning";

	// Prompt Kit Components
	import {
		PromptInput,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { PromptSuggestion } from "$lib/components/prompt-kit/prompt-suggestion";

	// Local Components
	import CodeViewerDialog from "./components/code-viewer-dialog.svelte";
	import { toast } from "svelte-sonner";
	import { marked } from "marked";

	// State
	let inputValue = $state("");
	let apiKey = $state("");
	let storedApiKey = $state("");
	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/playground",
				headers: storedApiKey
					? {
							"X-API-Key": storedApiKey,
						}
					: {},
				body: storedApiKey
					? {
							apiKey: storedApiKey,
						}
					: {},
			}),
		})
	);
	let status = $state<"idle" | "streaming" | "error" | "submitted">("idle");
	let showCodeModal = $state(false);
	let activeCategory = $state("");

	// Load API key from localStorage on mount
	onMount(() => {
		const saved = localStorage.getItem("openrouter-api-key");
		if (saved) {
			storedApiKey = saved;
		}
	});

	// Suggestion groups with icons
	const suggestionGroups = [
		{
			label: "Summary",
			highlight: "Summarize",
			icon: FileText,
			items: [
				"Summarize a document",
				"Summarize a video",
				"Summarize a podcast",
				"Summarize a book",
				"Summarize an article",
			],
		},
		{
			label: "Code",
			highlight: "Help me",
			icon: Code,
			items: [
				"Help me write React components",
				"Help me debug code",
				"Help me learn Python",
				"Help me learn SQL",
				"Help me optimize performance",
			],
		},
		{
			label: "Design",
			highlight: "Design",
			icon: Palette,
			items: [
				"Design a small logo",
				"Design a hero section",
				"Design a landing page",
				"Design a social media post",
				"Design a mobile app UI",
			],
		},
		{
			label: "Research",
			highlight: "Research",
			icon: Search,
			items: [
				"Research the best practices for SEO",
				"Research the best running shoes",
				"Research the best restaurants in Paris",
				"Research the best AI tools",
				"Research the latest tech trends",
			],
		},
	];

	// Get active category data
	let activeCategoryData = $derived(
		suggestionGroups.find((group) => group.label === activeCategory)
	);

	// Determine which suggestions to show
	let showCategorySuggestions = $derived(activeCategory !== "");

	// Component badges data
	const components = [
		{ name: "Prompt Input", type: "ai-elements" },
		{ name: "Prompt Suggestion", type: "prompt-kit" },
		{ name: "Messages", type: "ai-elements" },
		{ name: "Conversation", type: "ai-elements" },
		{ name: "Actions", type: "ai-elements" },
		{ name: "Response", type: "ai-elements" },
		{ name: "Reasoning", type: "ai-elements" },
	];

	// Handlers
	function handleSend() {
		if (inputValue.trim() && status === "idle") {
			chat.sendMessage({ text: inputValue });
			inputValue = "";
			activeCategory = "";
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function handlePromptInputValueChange(value: string) {
		inputValue = value;
		// Clear active category when typing something different
		if (value.trim() === "") {
			activeCategory = "";
		}
	}

	let handleSuggestionClick = (suggestion: string) => {
		inputValue = suggestion;
	};

	let handleCategoryClick = (category: string) => {
		activeCategory = category;
		inputValue = ""; // Clear input when selecting a category
	};

	function saveApiKey() {
		if (apiKey.trim()) {
			localStorage.setItem("openrouter-api-key", apiKey.trim());
			storedApiKey = apiKey.trim();
			apiKey = "";
			// Reload the page to reinitialize chat with new key
			window.location.reload();
		}
	}

	function clearApiKey() {
		localStorage.removeItem("openrouter-api-key");
		storedApiKey = "";
		// Reload the page to reinitialize chat without key
		window.location.reload();
	}

	let copyMessage = (content: string) => {
		navigator.clipboard.writeText(content);
		toast.success("Copied to clipboard!");
	};

	let startNewConversation = () => {
		chat.messages = [];
		activeCategory = "";
		inputValue = "";
	};

	watch(
		() => chat.status,
		() => {
			if (chat.status === "error") status = "error";
			else if (chat.status === "streaming") status = "streaming";
			else if (chat.status === "ready") status = "idle";
			else if (chat.status === "submitted") status = "submitted";
		}
	);
<\/script>

<main class="bg-background relative flex h-[calc(100vh-5rem)] flex-col">
{#if chat.messages.length === 0}
	<!-- Empty State with Centered Input -->
	<div class="relative h-full">
		<div class="absolute inset-x-0 top-1/2 mx-auto flex max-w-3xl -translate-y-1/2 flex-col gap-4 px-3 pb-3">
			<PromptInput
				class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
				value={inputValue}
				onValueChange={handlePromptInputValueChange}
				onSubmit={handleSend}
			>
				<PromptInputTextarea
					placeholder="Ask anything..."
					class="min-h-[44px] pt-3 pl-4 text-base"
					onkeydown={handleKeyDown}
				/>
				<PromptInputActions class="mt-5 flex w-full items-end justify-end gap-2 px-3 pb-3">
					<Button size="sm" class="h-9 w-9 rounded-full" onclick={handleSend} disabled={!inputValue.trim()}>
						<ArrowUpIcon class="h-4 w-4" />
					</Button>
				</PromptInputActions>
			</PromptInput>

			<div class="relative flex w-full flex-col items-center justify-center space-y-2">
				<div class="absolute top-0 left-0 h-[70px] w-full">
					{#if showCategorySuggestions}
						<div class="flex w-full flex-col space-y-1">
							{#each activeCategoryData?.items ?? [] as suggestion}
								<PromptSuggestion
									highlight={activeCategoryData?.highlight ?? ""}
									onclick={() => handleSuggestionClick(suggestion)}
									class="transition-all hover:scale-[1.02] hover:shadow-sm"
								>
									{suggestion}
								</PromptSuggestion>
							{/each}
						</div>
					{:else}
						<div class="relative flex w-full flex-wrap items-stretch justify-start gap-2">
							{#each suggestionGroups as group}
								<PromptSuggestion onclick={() => handleCategoryClick(group.label)} class="capitalize transition-all hover:scale-105 hover:shadow-md">
									{@const Icon = group.icon}
									<Icon class="mr-2 h-4 w-4" />
									{group.label}
								</PromptSuggestion>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<!-- Chat Messages -->
	<Conversation>
		<ConversationContent>
			<div class="space-y-6 py-4">
				{#each chat.messages as message}
					<div class="group relative">
						<Message from={message.role}>
							<MessageContent>
								<!-- Render reasoning parts first -->
								{#each message.parts as part, partIndex}
									{#if part.type === "reasoning"}
										<Reasoning
											class="mb-4 w-full"
											isStreaming={status === "streaming" &&
												partIndex === message.parts.length - 1 &&
												message.id === chat.messages.at(-1)?.id}
										>
											<ReasoningTrigger />
											<ReasoningContent>{@html marked(part.text)}</ReasoningContent>
										</Reasoning>
									{/if}
								{/each}

								<!-- Then render text parts -->
								{#each message.parts as part}
									{#if part.type === "text"}
										{#if message.role === "assistant"}
											<Response content={part.text} animation={{ enabled: true }} />
										{:else}
											<div class="prose prose-sm dark:prose-invert max-w-none">
												{part.text}
											</div>
										{/if}
									{/if}
								{/each}
							</MessageContent>
						</Message>

						<!-- Actions for both user and assistant messages -->
						{#if message.role === "assistant"}
							<Actions class="mt-2">
								<Action
									tooltip="Copy"
									onclick={() =>
										copyMessage(
											message.parts
												.map((p) => (p.type === "text" ? p.text : ""))
												.join("")
										)}
								>
									<Copy class="size-4" />
								</Action>
								<Action tooltip="Retry" onclick={() => chat.regenerate()}>
									<RefreshCcw class="size-4" />
								</Action>
								<Action tooltip="Like">
									<ThumbsUp class="size-4" />
								</Action>
								<Action tooltip="Dislike">
									<ThumbsDown class="size-4" />
								</Action>
							</Actions>
						{:else}
							<Actions class="mt-2 flex justify-end">
								<Action
									tooltip="Copy"
									onclick={() =>
										copyMessage(
											message.parts
												.map((p) => (p.type === "text" ? p.text : ""))
												.join("")
										)}
								>
									<Copy class="size-4" />
								</Action>
							</Actions>
						{/if}
					</div>
				{/each}
			</div>
		</ConversationContent>
		<ConversationScrollButton />
	</Conversation>

	<!-- Input at bottom -->
	<div class="border-t px-4 py-4">
		<div class="mx-auto max-w-3xl">
			<PromptInput
				class="rounded-3xl border p-0 pt-1 shadow-xs"
				value={inputValue}
				onValueChange={handlePromptInputValueChange}
				onSubmit={handleSend}
			>
				<PromptInputTextarea
					placeholder="Type your message..."
					class="min-h-[44px] pt-3 pl-4 text-base"
					onkeydown={handleKeyDown}
				/>
				<PromptInputActions class="mt-5 flex w-full items-end justify-end gap-2 px-3 pb-3">
					<Button
						size="sm"
						class="h-9 w-9 rounded-full"
						onclick={handleSend}
						disabled={!inputValue.trim()}
					>
						<ArrowUpIcon class="h-4 w-4" />
					</Button>
				</PromptInputActions>
			</PromptInput>
		</div>
	</div>
{/if}
</main>`;

	const serverCode = `import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } = await request.json();

	// Use custom API key if provided, otherwise use default
	const provider = apiKey
		? createOpenRouter({ apiKey })
		: createOpenRouter({
				apiKey: OPENROUTER_API_KEY || "",
			});

	const result = streamText({
		model: provider(defaultModel),
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: true,
		sendSources: true,
	});
};`;

	const envCode = `# OpenRouter API Key
# Get your free API key at: https://openrouter.ai/keys
#
# NOTE: We're using a FREE AI model (z-ai/glm-4.5-air:free) in this playground
# so you won't be charged for API usage. Perfect for testing and development!
OPENROUTER_API_KEY=your_openrouter_api_key_here`;

	const aiConfigCode = `// AI Configuration
// This file manages your AI provider settings and model selection
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

// Using a FREE AI model - no charges will be incurred!
// The z-ai/glm-4.5-air:free model is completely free to use
// Perfect for development, testing, and learning
export const defaultModel = "z-ai/glm-4.5-air:free";`;

	const packageJsonCode = `{
  "dependencies": {
    "@ai-sdk/svelte": "^1.0.0",
    "@openrouter/ai-sdk-provider": "^0.0.5",
    "ai": "^4.0.0",
    "runed": "^0.15.0"
  }
}`;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="flex max-h-[90vh] flex-col overflow-hidden sm:min-w-[820px]">
		<Dialog.Header>
			<Dialog.Title>Playground Code</Dialog.Title>
			<Dialog.Description>
				Copy and paste this code to build your own AI chat playground
			</Dialog.Description>
		</Dialog.Header>

		<Tooltip.Provider>
			<Tabs.Root value="page" class="flex flex-1 flex-col overflow-hidden">
				<Tabs.List class="grid w-full grid-cols-5">
					<Tabs.Trigger value="page" class="gap-2">
						<SvelteLogo class="size-4" />
						+page.svelte
					</Tabs.Trigger>
					<Tabs.Trigger value="server" class="gap-2">
						<TypeScriptLogo class="size-4" />
						+server.ts
					</Tabs.Trigger>
					<Tabs.Trigger value="ai-config" class="gap-2">
						<Settings class="size-4" />
						ai-config.ts
					</Tabs.Trigger>
					<Tabs.Trigger value="env" class="gap-2">
						<FileText class="size-4" />
						.env.example
					</Tabs.Trigger>
					<Tabs.Trigger value="package" class="gap-2">
						<FileJson class="size-4" />
						package.json
					</Tabs.Trigger>
				</Tabs.List>

				<div class="mt-4 flex-1 overflow-auto">
					<Tabs.Content value="page" class="mt-0">
						<div>
							<Code.Overflow class="w-full data-[collapsed=true]:max-h-[380px]">
								<Code.Root lang="svelte" code={pageCode}>
									<Code.CopyButton class="z-30" />
								</Code.Root>
							</Code.Overflow>
						</div>
					</Tabs.Content>

					<Tabs.Content value="server" class="mt-0">
						<Code.Root lang="typescript" code={serverCode}>
							<Code.CopyButton />
						</Code.Root>
					</Tabs.Content>

					<Tabs.Content value="ai-config" class="mt-0">
						<Code.Root lang="typescript" code={aiConfigCode}>
							<Code.CopyButton />
						</Code.Root>
					</Tabs.Content>

					<Tabs.Content value="env" class="mt-0">
						<Code.Root lang="bash" code={envCode}>
							<Code.CopyButton />
						</Code.Root>
					</Tabs.Content>

					<Tabs.Content value="package" class="mt-0 space-y-4">
						<div>
							<h4 class="mb-3 text-sm font-semibold">Install Dependencies</h4>
							<AiInstallCommand
								command="add"
								args={[
									"ai",
									"@ai-sdk/svelte",
									"@openrouter/ai-sdk-provider",
									"runed",
								]}
							/>
						</div>
						<div>
							<h4 class="mb-3 text-sm font-semibold">Package Configuration</h4>
							<div>
								<Code.Root lang="json" code={packageJsonCode}>
									<Code.CopyButton />
								</Code.Root>
							</div>
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Tooltip.Provider>
	</Dialog.Content>
</Dialog.Root>
