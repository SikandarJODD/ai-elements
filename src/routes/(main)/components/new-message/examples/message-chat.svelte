<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import RefreshCcwIcon  from "@lucide/svelte/icons/refresh-ccw";
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input";
	import {
		Message,
		MessageContent,
		MessageResponse,
		MessageActions,
		MessageAction,
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

	let handleRegenerate = () => {
		chat.regenerate();
	};
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
	<div class="flex w-full flex-col gap-4">
		{#each chat.messages as message, index (message.id)}
			{@const isLastMessage = index === chat.messages.length - 1}
			{#each message.parts as part}
				{#if part.type === "text"}
					<Message from={message.role}>
						<MessageContent>
							<MessageResponse content={part.text}></MessageResponse>
						</MessageContent>
					</Message>
					{#if message.role === "assistant" && isLastMessage && chat.status === "ready"}
						<MessageActions>
							<MessageAction onclick={handleRegenerate} label="Retry">
								<RefreshCcwIcon className="size-3" />
							</MessageAction>
							<MessageAction
								onclick={() => navigator.clipboard.writeText(part.text)}
								label="Copy"
							>
								<CopyIcon className="size-3" />
							</MessageAction>
						</MessageActions>
					{/if}
				{/if}
			{/each}
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
