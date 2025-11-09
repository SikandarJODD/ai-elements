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
			content: "What is React?",
		},
		{
			id: crypto.randomUUID(),
			role: "assistant",
			content:
				"React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Meta and a community of developers.",
		},
		{
			id: crypto.randomUUID(),
			role: "user",
			content: "How does component state work?",
		},
	];

	let messages = $state<MessageType[]>([...initialMessages]);
	let checkpoints = $state([{ messageCount: 2, timestamp: new Date(Date.now() - 3_600_000) }]);

	function handleRestore(messageCount: number) {
		messages = initialMessages.slice(0, messageCount);
	}
</script>

<div class="flex size-full flex-col rounded-lg border p-6">
	<Conversation>
		<ConversationContent>
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
</div>
