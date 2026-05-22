<script lang="ts">
	import {
		Checkpoint,
		CheckpointIcon,
		CheckpointTrigger,
	} from "$lib/components/ai-elements/checkpoint/index.js";
	import {
		Conversation,
		ConversationContent,
	} from "$lib/components/ai-elements/conversation/index.js";
	import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";

	type MessageType = {
		id: string;
		role: "user" | "assistant";
		content: string;
	};

	const initialMessages: MessageType[] = [
		{
			id: crypto.randomUUID(),
			role: "user",
			content: "What is Svelte?",
		},
		{
			id: crypto.randomUUID(),
			role: "assistant",
			content:
				"Svelte is a modern JavaScript framework for building user interfaces. It is known for its small bundle size and high performance.",
		},
		{
			id: crypto.randomUUID(),
			role: "user",
			content: "What are the benefits of using Svelte?",
		},
	];

	let messages = $state<MessageType[]>([...initialMessages]);
	let checkpoints = $state([{ messageCount: 2, timestamp: new Date(Date.now() - 3_600_000) }]);

	function handleRestore(messageCount: number) {
		messages = initialMessages.slice(0, messageCount);
	}
</script>

<Conversation>
	<ConversationContent class='flex flex-col gap-4'>
		{#each messages as message, index (message.id)}
			<Message from={message.role}>
				<MessageContent>
					{message.content}
				</MessageContent>
			</Message>

			{#each checkpoints as checkpoint (checkpoint.timestamp)}
				{#if checkpoint.messageCount === index + 1}
					<Checkpoint>
						<CheckpointIcon />
						<CheckpointTrigger
							onclick={() => handleRestore(checkpoint.messageCount)}
							tooltip="Restores workspace and chat to this point"
						>
							Restore checkpoint
						</CheckpointTrigger>
					</Checkpoint>
				{/if}
			{/each}
		{/each}
	</ConversationContent>
</Conversation>
