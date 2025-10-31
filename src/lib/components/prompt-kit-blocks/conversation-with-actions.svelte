<script lang="ts">
	import {
		ChatContainerContent,
		ChatContainerRoot,
	} from "$lib/components/prompt-kit/chat-container";
	import {
		Message,
		MessageAction,
		MessageActions,
		MessageContent,
	} from "$lib/components/prompt-kit/message";
	import { Button } from "$lib/components/ui/button/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import { cn } from "$lib/utils/utils";

	const messages = [
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
	];

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

<ChatContainerRoot class="h-[400px] w-full">
	<ChatContainerContent class="h-full !min-w-full space-y-4 overflow-y-auto px-4 py-6">
		{#each messages as message, index}
			{@const isAssistant = message.role === "assistant"}
			{@const isLastMessage = index === messages.length - 1}
			<Message
				class={cn(
					"mx-auto flex w-full max-w-3xl flex-col gap-2 px-0 md:px-6",
					isAssistant ? "items-start" : "items-end"
				)}
			>
				{#if message.role === "assistant"}
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
					<div class="group flex flex-col items-end gap-1">
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
