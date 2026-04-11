<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input";
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/new-message";
	import { Chat } from "@ai-sdk/svelte";

	let chat = new Chat({});

	function handleSubmit(message: PromptInputMessage) {
		chat.sendMessage({ text: message.text });
	}
	let handleStop = () => {
		if (chat.status === "streaming") {
			chat.stop();
		}
	};
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
	<div class="flex w-full flex-col gap-4">
		{#each chat.messages as message (message.id)}
			<Message from={message.role}>
				{#each message.parts as part}
					{#if part.type === "text"}
						{#if message.role === "assistant"}
							<MessageContent>
								<MessageResponse content={part.text} />
							</MessageContent>
						{:else}
							<MessageContent>{part.text}</MessageContent>
						{/if}
					{/if}
				{/each}
			</Message>
		{/each}
	</div>

	<PromptInput.Root class="w-full" onSubmit={handleSubmit}>
		<PromptInput.Body>
			<PromptInput.Textarea placeholder="Ask about the new-message API..." />
		</PromptInput.Body>
		<PromptInput.Toolbar class="justify-end">
			<PromptInput.Submit onStop={handleStop} status={chat.status} />
		</PromptInput.Toolbar>
	</PromptInput.Root>
</div>
