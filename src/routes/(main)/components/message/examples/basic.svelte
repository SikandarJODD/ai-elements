<script lang="ts">
	import { Message, MessageAvatar, MessageContent } from "$lib/components/ai-elements/message/index.js";

	type MessageData = {
		key: string;
		from: "user" | "assistant";
		content: string;
		avatar: string;
		name: string;
	};

	const messages: MessageData[] = $state([
		{
			key: crypto.randomUUID(),
			from: "user",
			content: "Hello, how are you?",
			avatar: "https://github.com/haydenbleasel.png",
			name: "Hayden Bleasel",
		},
		{
			key: crypto.randomUUID(),
			from: "assistant",
			content: "Hello! I'm doing well, thank you for asking. How can I help you today?",
			avatar: "https://github.com/copilot.png",
			name: "Assistant",
		},
		{
			key: crypto.randomUUID(),
			from: "user",
			content: "Can you help me understand Svelte 5 runes?",
			avatar: "https://github.com/haydenbleasel.png",
			name: "Hayden Bleasel",
		},
		{
			key: crypto.randomUUID(),
			from: "assistant",
			content: "Absolutely! Svelte 5 introduces runes like $state, $derived, and $props which provide a more powerful and flexible reactivity system. Would you like me to explain any specific rune?",
			avatar: "https://github.com/copilot.png",
			name: "Assistant",
		},
	]);
</script>

<div class="space-y-4">
	{#each messages as { content, key, from, avatar, name }}
		<Message {from} data-key={key}>
			<MessageContent>{content}</MessageContent>
			<MessageAvatar {name} src={avatar} />
		</Message>
	{/each}
</div>