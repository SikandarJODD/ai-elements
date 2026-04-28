<script lang="ts">
	import * as Message from "$lib/components/ai-elements/message";
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input";

	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/stream-text",
			}),
		})
	);
	let handleSubmit = (message: PromptInputMessage) => {
		chat.sendMessage({ text: message.text });
	};
</script>

<div>
	<!-- Prompt Input -->
	<div class="max-w-xl">
		<PromptInput.Root onSubmit={handleSubmit}>
			<PromptInput.Body>
				<PromptInput.Textarea placeholder="Type your message..." />
			</PromptInput.Body>
			<PromptInput.Toolbar>
				<PromptInput.Submit status={chat.status} />
			</PromptInput.Toolbar>
		</PromptInput.Root>
	</div>
	<!-- Chat Messages -->
	<div class="mt-6 flex flex-col gap-4">
		{#each chat.messages as message}
			{#each message.parts as part}
				<Message.Root from={message.role}>
					{#if part.type === "text"}
						<Message.Content>
							<Message.Response content={part.text}></Message.Response>
						</Message.Content>
					{/if}
				</Message.Root>
			{/each}
		{/each}
	</div>
</div>
