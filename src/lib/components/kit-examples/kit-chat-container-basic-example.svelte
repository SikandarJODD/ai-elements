<script lang="ts">
	import {
		ChatContainerContent,
		ChatContainerRoot
	} from '$lib/components/prompt-kit/chat-container';
	import { Markdown } from '$lib/components/prompt-kit/markdown';
	import {
		Message,
		MessageAvatar,
		MessageContent
	} from '$lib/components/prompt-kit/message';
	import { Button } from '$lib/components/ui/button';

	let messages = $state([
		{
			id: 1,
			role: 'user',
			content: 'Hello! Can you help me with a coding question?'
		},
		{
			id: 2,
			role: 'assistant',
			content:
				"Of course! I'd be happy to help with your coding question. What would you like to know?"
		},
		{
			id: 3,
			role: 'user',
			content: 'How do I create a responsive layout with CSS Grid?'
		},
		{
			id: 4,
			role: 'assistant',
			content:
				"Creating a responsive layout with CSS Grid is straightforward. Here's a basic example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\nThis creates a grid where:\n- Columns automatically fit as many as possible\n- Each column is at least 250px wide\n- Columns expand to fill available space\n- There's a 1rem gap between items\n\nWould you like me to explain more about how this works?"
		}
	]);

	function addMessage() {
		const lastMessage = messages[messages.length - 1];
		const newMessage = {
			id: messages.length + 1,
			role: lastMessage.role === 'user' ? 'assistant' : 'user',
			content:
				lastMessage.role === 'user'
					? "That's a great question! Let me explain further. CSS Grid is a powerful layout system that allows for two-dimensional layouts. The `minmax()` function is particularly useful as it sets a minimum and maximum size for grid tracks."
					: 'Thanks for the explanation! Could you tell me more about grid areas?'
		};
		messages = [...messages, newMessage];
	}
</script>

<div class="flex h-[400px] w-full flex-col overflow-hidden">
	<div class="flex items-center justify-between border-b p-3">
		<div />
		<div class="flex items-center gap-2">
			<Button size="sm" onclick={addMessage}>Add Message</Button>
		</div>
	</div>

	<ChatContainerRoot class="flex-1">
		<ChatContainerContent class="space-y-4 p-4">
			{#each messages as message (message.id)}
				{@const isAssistant = message.role === 'assistant'}
				<Message class={message.role === 'user' ? 'justify-end' : 'justify-start'}>
					{#if isAssistant}
						<MessageAvatar src="/avatars/ai.png" alt="AI Assistant" fallback="AI" />
					{/if}
					<div class="max-w-[85%] flex-1 sm:max-w-[75%]">
						{#if isAssistant}
							<div class="prose rounded-lg bg-secondary p-2 text-foreground">
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
	</ChatContainerRoot>
</div>
