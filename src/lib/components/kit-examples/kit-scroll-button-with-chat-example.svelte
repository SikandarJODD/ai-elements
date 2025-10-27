<script lang="ts">
	import {
		ChatContainerRoot,
		ChatContainerContent,
	} from "$lib/components/prompt-kit/chat-container/index.js";
	import { Markdown } from "$lib/components/prompt-kit/markdown/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
	} from "$lib/components/prompt-kit/message/index.js";
	import {
		ScrollButton,
		setScrollContext,
	} from "$lib/components/prompt-kit/scroll-button/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { onDestroy } from "svelte";
	import { watch } from "runed";

	const scrollContext = setScrollContext();

	type MessageType = {
		id: number;
		role: "user" | "assistant";
		content: string;
	};

	let messages = $state<MessageType[]>([
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
	]);

	let isStreaming = $state(false);
	let streamInterval: ReturnType<typeof setInterval> | null = null;
	let streamContent = "";

	const streamResponse = () => {
		if (isStreaming) return;

		isStreaming = true;
		const fullResponse =
			"Yes, I'd be happy to explain more about CSS Grid! The `grid-template-columns` property defines the columns in your grid. The `repeat()` function is a shorthand that repeats a pattern. `auto-fit` will fit as many columns as possible in the available space. The `minmax()` function sets a minimum and maximum size for each column. This creates a responsive layout that automatically adjusts based on the available space without requiring media queries.";

		// Add a new message with empty content that will be filled gradually
		const newMessageId = messages.length + 1;
		messages = [
			...messages,
			{
				id: newMessageId,
				role: "assistant",
				content: "",
			},
		];

		// Start streaming content character by character
		let charIndex = 0;
		streamContent = "";

		streamInterval = setInterval(() => {
			if (charIndex < fullResponse.length) {
				streamContent += fullResponse[charIndex];
				messages = messages.map((msg) =>
					msg.id === newMessageId ? { ...msg, content: streamContent } : msg
				);
				charIndex++;
			} else {
				// End streaming
				if (streamInterval) clearInterval(streamInterval);
				isStreaming = false;
			}
		}, 30); // Stream a character every 30ms
	};

	// Clean up interval on unmount
	onDestroy(() => {
		if (streamInterval) {
			clearInterval(streamInterval);
		}
	});

	let containerRef = $state<HTMLDivElement | null>(null);

	watch(
		() => containerRef,
		() => {
			if (containerRef) {
				scrollContext.setElement(containerRef);
			}
		}
	);
</script>

<div class="relative flex h-[400px] w-full flex-col overflow-hidden">
	<div class="flex w-full items-center justify-between border-b p-3">
		<div></div>
		<Button size="sm" onclick={streamResponse} disabled={isStreaming}>
			{isStreaming ? "Streaming..." : "Add Message"}
		</Button>
	</div>

	<div bind:this={containerRef} class="flex-1 overflow-auto">
		<ChatContainerRoot class="h-full">
			<ChatContainerContent class="space-y-4 p-4">
				{#each messages as message (message.id)}
					{@const isAssistant = message.role === "assistant"}
					<Message class={message.role === "user" ? "justify-end" : "justify-start"}>
						{#if isAssistant}
							<MessageAvatar src="/avatars/ai.png" alt="AI Assistant" fallback="AI" />
						{/if}
						<div class="max-w-[85%] flex-1 sm:max-w-[75%]">
							{#if isAssistant}
								<div class="bg-secondary text-foreground prose rounded-lg p-2">
									<Markdown content={message.content} />
								</div>
							{:else}
								<MessageContent class="bg-primary text-primary-foreground">
									{message.content}
								</MessageContent>
							{/if}
						</div>
					</Message>
				{/each}
			</ChatContainerContent>
			<div class="absolute right-7 bottom-4">
				<ScrollButton class="shadow-sm" />
			</div>
		</ChatContainerRoot>
	</div>
</div>
