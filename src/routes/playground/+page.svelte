<script lang="ts">
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

	// Suggestion groups
	const suggestionGroups = [
		{
			label: "Summary",
			highlight: "Summarize",
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
		// Optionally auto-send:
		// handleSend();
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
		// chat.reset();
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
</script>

<svelte:head>
	<title>AI Chat Playground - Svelte AI Elements</title>
	<meta
		name="description"
		content="Experience our AI Elements components in action with a real-time chat playground."
	/>
</svelte:head>

<main class="bg-background relative flex h-[calc(100vh-5rem)] flex-col">
	<!-- Main Content Area -->
	<div class="relative flex flex-1 overflow-hidden">
		<!-- Chat Container (Left Side) -->
		<div class="relative flex-1 overflow-hidden">
			{#if chat.messages.length === 0}
				<!-- Empty State with Centered Input -->
				<div class="relative h-full">
					<div
						class="absolute inset-x-0 top-1/2 mx-auto flex max-w-3xl -translate-y-1/2 flex-col items-center justify-center gap-4 px-3 pb-3 md:px-5 md:pb-5"
					>
						<PromptInput
							class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
							value={inputValue}
							onValueChange={handlePromptInputValueChange}
							onSubmit={handleSend}
						>
							<PromptInputTextarea
								placeholder="Ask anything..."
								class="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
								onkeydown={handleKeyDown}
							/>
							<PromptInputActions
								class="mt-5 flex w-full items-end justify-end gap-2 px-3 pb-3"
							>
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

						<div
							class="relative flex w-full flex-col items-center justify-center space-y-2"
						>
							<div class="absolute top-0 left-0 h-[70px] w-full">
								{#if showCategorySuggestions}
									<div class="flex w-full flex-col space-y-1">
										{#each activeCategoryData?.items ?? [] as suggestion}
											<PromptSuggestion
												highlight={activeCategoryData?.highlight ?? ""}
												onclick={() => handleSuggestionClick(suggestion)}
											>
												{suggestion}
											</PromptSuggestion>
										{/each}
									</div>
								{:else}
									<div
										class="relative flex w-full flex-wrap items-stretch justify-start gap-2"
									>
										{#each suggestionGroups as group}
											<PromptSuggestion
												onclick={() => handleCategoryClick(group.label)}
												class="capitalize"
											>
												<Brain class="mr-2 h-4 w-4" />
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
				<div class="flex h-full flex-col">
					<div class="flex-1 overflow-hidden px-4 py-4 sm:px-6">
						<div class="mx-auto h-full max-w-3xl">
							<Conversation class="h-full">
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
																	isStreaming={status ===
																		"streaming" &&
																		partIndex ===
																			message.parts.length -
																				1 &&
																		message.id ===
																			chat.messages.at(-1)
																				?.id}
																>
																	<ReasoningTrigger />
																	<ReasoningContent>
																		{@html marked(part.text)}
																	</ReasoningContent>
																</Reasoning>
															{/if}
														{/each}

														<!-- Then render text parts -->
														{#each message.parts as part}
															{#if part.type === "text"}
																{#if message.role === "assistant"}
																	<Response
																		content={part.text}
																		animation={{
																			enabled: true,
																		}}
																	/>
																{:else}
																	<div
																		class="prose prose-sm dark:prose-invert max-w-none"
																	>
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
																		.map((p) =>
																			p.type === "text"
																				? p.text
																				: ""
																		)
																		.join("")
																)}
														>
															<Copy class="size-4" />
														</Action>
														<Action
															tooltip="Retry"
															onclick={() => chat.regenerate()}
														>
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
																		.map((p) =>
																			p.type === "text"
																				? p.text
																				: ""
																		)
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
						</div>
					</div>

					<!-- Input Area (Bottom) -->
					<div class="border-border bg-background border-t px-4 py-4 sm:px-6">
						<div class="mx-auto max-w-3xl">
							<PromptInput
								class="border-input bg-popover rounded-3xl border p-0 pt-1 shadow-xs"
								value={inputValue}
								onValueChange={handlePromptInputValueChange}
								onSubmit={handleSend}
							>
								<PromptInputTextarea
									placeholder="Type your message..."
									class="min-h-[44px] pt-3 pl-4 text-base"
									onkeydown={handleKeyDown}
								/>
								<PromptInputActions
									class="mt-5 flex w-full items-end justify-end gap-2 px-3 pb-3"
								>
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
				</div>
			{/if}
		</div>

		<!-- Right Sidebar (Info Card) -->
		<aside class="border-border hidden w-80 border-l lg:block">
			<div class="h-full overflow-y-auto p-6">
				<div class="bg-muted/30 sticky top-6 space-y-6 rounded-2xl border p-6">
					<!-- Title Section -->
					<div class="space-y-2">
						<h1 class="text-xl font-bold">AI Chat Playground</h1>
						<p class="text-muted-foreground text-sm">
							Experience our AI Elements in action
						</p>
					</div>

					<!-- Components Section -->
					<!-- <div class="space-y-3">
						<h4 class="text-sm font-semibold">Components Used</h4>
						<div class="flex flex-wrap gap-1.5">
							{#each components as component}
								<Badge
									variant={component.type === "ai-elements"
										? "default"
										: "secondary"}
									class="text-xs"
								>
									{component.name}
								</Badge>
							{/each}
						</div>
					</div> -->

					<!-- API Key Section -->
					<div class="border-border space-y-3 border-t pt-4">
						<div class="space-y-1.5">
							<Label for="api-key" class="text-sm font-semibold">
								OpenRouter API Key (Optional)
							</Label>
							<p class="text-muted-foreground text-xs">
								For faster replies, use your own API key. We store it securely in
								your browser.
							</p>
						</div>

						{#if storedApiKey}
							<div class="bg-muted/50 space-y-2 rounded-lg border p-3">
								<div class="flex items-center gap-2">
									<KeyIcon class="text-muted-foreground size-4" />
									<span class="text-xs font-medium">API Key Saved</span>
								</div>
								<Button
									variant="destructive"
									size="sm"
									class="w-full"
									onclick={clearApiKey}
								>
									<Trash2Icon class="mr-2 size-3.5" />
									Clear API Key
								</Button>
							</div>
						{:else}
							<div class="space-y-2">
								<Input
									id="api-key"
									type="password"
									placeholder="sk-or-v1-..."
									bind:value={apiKey}
									class="text-xs"
								/>
								<Button
									variant="secondary"
									size="sm"
									class="w-full"
									onclick={saveApiKey}
									disabled={!apiKey.trim()}
								>
									<KeyIcon class="mr-2 size-3.5" />
									Save API Key
								</Button>
							</div>
						{/if}
					</div>

					<!-- Tech Stack Section -->
					<div class="border-border space-y-2 border-t pt-4">
						<h4 class="text-sm font-semibold">Built With</h4>
						<div class="text-muted-foreground space-y-1 text-sm">
							<a
								href="https://sdk.vercel.ai"
								target="_blank"
								rel="noopener noreferrer"
								class="hover:text-foreground block font-medium underline"
							>
								→ Vercel AI SDK
							</a>
							<a
								href="https://openrouter.ai"
								target="_blank"
								rel="noopener noreferrer"
								class="hover:text-foreground block font-medium underline"
							>
								→ OpenRouter
							</a>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="border-border space-y-2 border-t pt-4">
						<Button
							variant="outline"
							size="sm"
							class="w-full justify-start"
							onclick={() => (showCodeModal = true)}
						>
							<Code class="mr-2 size-4" />
							View Code
						</Button>
						<Button
							variant="outline"
							size="sm"
							class="w-full justify-start"
							onclick={startNewConversation}
						>
							<PlusIcon class="mr-2 size-4" />
							New Chat
						</Button>
					</div>
				</div>
			</div>
		</aside>
	</div>
</main>

<!-- Code Viewer Modal -->
<CodeViewerDialog bind:open={showCodeModal} />
