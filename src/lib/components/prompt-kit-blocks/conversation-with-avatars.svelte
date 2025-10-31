<script lang="ts">
	import {
		ChatContainerContent,
		ChatContainerRoot,
	} from "$lib/components/prompt-kit/chat-container";
	import { Message, MessageAvatar, MessageContent } from "$lib/components/prompt-kit/message";
	import { cn } from "$lib/utils/utils";

	const messages = [
		{
			id: 1,
			role: "user",
			content: "Hello! Can you help me with a coding question?",
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
			fallback: "U",
		},
		{
			id: 2,
			role: "assistant",
			content:
				"Of course! I'd be happy to help with your coding question. What would you like to know?",
			avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=assistant",
			fallback: "AI",
		},
		{
			id: 3,
			role: "user",
			content: "How do I create a responsive layout with CSS Grid?",
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
			fallback: "U",
		},
		{
			id: 4,
			role: "assistant",
			content:
				"Creating a responsive layout with CSS Grid is straightforward. Here's a basic example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\nThis creates a grid where:\n- Columns automatically fit as many as possible\n- Each column is at least 250px wide\n- Columns expand to fill available space\n- There's a 1rem gap between items\n\nWould you like me to explain more about how this works?",
			avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=assistant",
			fallback: "AI",
		},
	];
</script>

<ChatContainerRoot class="h-[400px] w-full">
	<ChatContainerContent class="h-full min-w-full space-y-4 overflow-y-auto px-4 py-6">
		{#each messages as message (message.id)}
			{@const isAssistant = message.role === "assistant"}
			<Message
				class={cn(
					"mx-auto flex w-full max-w-3xl flex-col gap-2 px-0 md:px-6",
					isAssistant ? "items-start" : "items-end"
				)}
			>
				{#if message.role === "assistant"}
					<MessageAvatar
						src={message.avatar}
						alt={message.role}
						fallback={message.fallback}
						class="mb-0.5 h-6 w-6"
					/>
				{:else}
					<MessageAvatar
						class="h-6 w-6"
						src={message.avatar}
						alt={message.role}
						fallback={message.fallback}
					/>
				{/if}
				{#if isAssistant}
					<MessageContent
						class="prose text-primary w-full max-w-[85%] flex-1 overflow-x-auto rounded-lg bg-transparent p-0 py-0 sm:max-w-[75%]"
						markdown={true}
						content={message.content}
					></MessageContent>
				{:else}
					<MessageContent class="bg-secondary text-primary max-w-[85%] sm:max-w-[75%]">
						{message.content}
					</MessageContent>
				{/if}
			</Message>
		{/each}
	</ChatContainerContent>
</ChatContainerRoot>
