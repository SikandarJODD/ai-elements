<script lang="ts">
	import {
		ChatContainerContent,
		ChatContainerRoot,
	} from "$lib/components/prompt-kit/chat-container";
	import {
		Message,
		MessageContent,
		MessageActions,
		MessageAction,
	} from "$lib/components/prompt-kit/message";
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { ScrollButton, setScrollContext } from "$lib/components/prompt-kit/scroll-button";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils/utils";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import MicIcon from "@lucide/svelte/icons/mic";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { watch } from "runed";

	import CopyIcon from "@lucide/svelte/icons/copy";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

	const scrollContext = setScrollContext();

	let messages = $state([
		{
			id: 1,
			role: "user",
			content: "Hello! Can you help me with a coding question?",
		},
		{
			id: 2,
			role: "assistant",
			content:
				"Of course! I'd be happy to help with your coding question. What would you like to know?",
		},
		{
			id: 3,
			role: "user",
			content: "How do I create a responsive layout with CSS Grid?",
		},
		{
			id: 4,
			role: "assistant",
			content:
				"Creating a responsive layout with CSS Grid is straightforward. Here's a basic example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\nThis creates a grid where:\n- Columns automatically fit as many as possible\n- Each column is at least 250px wide\n- Columns expand to fill available space\n- There's a 1rem gap between items\n\nWould you like me to explain more about how this works?",
		},
		{
			id: 5,
			role: "user",
			content: "What is the capital of France?",
		},
		{
			id: 6,
			role: "assistant",
			content: "The capital of France is Paris.",
		},
	]);

	let prompt = $state("");
	let isLoading = $state(false);
	let containerRef = $state<HTMLDivElement | null>(null);

	watch(
		() => containerRef,
		() => {
			if (containerRef) {
				scrollContext.setElement(containerRef);
			}
		}
	);

	function handleSubmit() {
		if (!prompt.trim()) return;

		// Add user message
		messages = [
			...messages,
			{
				id: messages.length + 1,
				role: "user",
				content: prompt,
			},
		];

		const userPrompt = prompt;
		prompt = "";
		isLoading = true;

		// Simulate API response
		setTimeout(() => {
			messages = [
				...messages,
				{
					id: messages.length + 1,
					role: "assistant",
					content: `You asked: "${userPrompt}". This is a simulated response.`,
				},
			];
			isLoading = false;
		}, 1500);
	}
	function handleCopy(content: string) {
		navigator.clipboard.writeText(content);
		console.log("Copied to clipboard");
	}

	function handleLike(id: number) {
		console.log("Liked message:", id);
	}

	function handleDislike(id: number) {
		console.log("Disliked message:", id);
	}

	function handleRegenerate(id: number) {
		console.log("Regenerate message:", id);
	}
</script>

<main class="bg-background flex h-[500px] w-full flex-col">
	<div class="relative flex-1 overflow-hidden">
		<div bind:this={containerRef} class="h-full overflow-y-auto py-12">
			<ChatContainerRoot class="relative h-full w-full flex-1 space-y-0 overflow-y-auto px-4">
				<ChatContainerContent class="min-w-full space-y-12 px-4 py-12">
					{#each messages as message, index}
						{@const isAssistant = message.role === "assistant"}
						{@const isLastMessage = index === messages.length - 1}
						<Message
							class={cn(
								"mx-auto flex w-full max-w-3xl flex-col gap-2 px-0 md:px-6",
								isAssistant ? "items-start" : "items-end"
							)}
						>
							{#if isAssistant}
								<div class="group flex w-full flex-col gap-0">
									<MessageContent
										class="text-foreground prose w-full flex-1 rounded-lg bg-transparent p-0"
										markdown={true}
										content={message.content}
									></MessageContent>
									<MessageActions
										class={cn(
											"-ml-2.5 flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
											isLastMessage && "opacity-100"
										)}
									>
										<MessageAction>
											{#snippet tooltip()}
												<p>Copy</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleCopy(message.content)}
											>
												<CopyIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Like</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleLike(message.id)}
											>
												<ThumbsUpIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Dislike</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleDislike(message.id)}
											>
												<ThumbsDownIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Regenerate</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleRegenerate(message.id)}
											>
												<RefreshCwIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
									</MessageActions>
								</div>
							{:else}
								<div class="group flex w-full flex-col items-end gap-1">
									<MessageContent
										class="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]"
									>
										{message.content}
									</MessageContent>
									<MessageActions
										class={cn(
											"flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
										)}
									>
										<MessageAction>
											{#snippet tooltip()}
												<p>Copy</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleCopy(message.content)}
											>
												<CopyIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Like</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleLike(message.id)}
											>
												<ThumbsUpIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Dislike</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleDislike(message.id)}
											>
												<ThumbsDownIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
										<MessageAction>
											{#snippet tooltip()}
												<p>Regenerate</p>
											{/snippet}
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8"
												onclick={() => handleRegenerate(message.id)}
											>
												<RefreshCwIcon class="h-4 w-4" />
											</Button>
										</MessageAction>
									</MessageActions>
								</div>
							{/if}
						</Message>
					{/each}
				</ChatContainerContent>
			</ChatContainerRoot>
		</div>
		<div class="absolute right-4 bottom-4">
			<ScrollButton class="shadow-sm" />
		</div>
	</div>

	<div class="bg-background z-10 shrink-0 px-3 pb-3 md:px-5 md:pb-5">
		<div class="mx-auto max-w-3xl">
			<PromptInput
				{isLoading}
				value={prompt}
				onValueChange={(v) => (prompt = v)}
				onSubmit={handleSubmit}
				class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
			>
				<div class="flex flex-col">
					<PromptInputTextarea
						placeholder="Ask anything"
						class="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
					/>

					<PromptInputActions
						class="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3"
					>
						<div class="flex items-center gap-2">
							<PromptInputAction>
								{#snippet tooltip()}
									<p>Add a new action</p>
								{/snippet}
								<Button variant="outline" size="icon" class="size-9 rounded-full">
									<PlusIcon class="h-[18px] w-[18px]" />
								</Button>
							</PromptInputAction>

							<PromptInputAction>
								{#snippet tooltip()}
									<p>Search</p>
								{/snippet}
								<Button variant="outline" class="rounded-full">
									<GlobeIcon class="h-[18px] w-[18px]" />
									Search
								</Button>
							</PromptInputAction>

							<PromptInputAction>
								{#snippet tooltip()}
									<p>More actions</p>
								{/snippet}
								<Button variant="outline" size="icon" class="size-9 rounded-full">
									<MoreHorizontalIcon class="h-[18px] w-[18px]" />
								</Button>
							</PromptInputAction>
						</div>
						<div class="flex items-center gap-2">
							<PromptInputAction>
								{#snippet tooltip()}
									<p>Voice input</p>
								{/snippet}
								<Button variant="outline" size="icon" class="size-9 rounded-full">
									<MicIcon class="h-[18px] w-[18px]" />
								</Button>
							</PromptInputAction>

							<Button
								size="icon"
								disabled={!prompt.trim() || isLoading}
								onclick={handleSubmit}
								class="size-9 rounded-full"
							>
								{#if !isLoading}
									<ArrowUpIcon class="h-[18px] w-[18px]" />
								{:else}
									<span class="size-3 rounded-xs bg-white"></span>
								{/if}
							</Button>
						</div>
					</PromptInputActions>
				</div>
			</PromptInput>
		</div>
	</div>
</main>
