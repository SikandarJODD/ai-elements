<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input-new";
	import type { Message } from "$lib/components/ai-elements/prompt-input-new";
	import { Chat } from "@ai-sdk/svelte";
	let chat = new Chat({});

	function handleSubmit(message: Message) {
		if (message.text) {
			chat.sendMessage({
				text: message.text,
			});
		}
	}
</script>

<div class="flex min-h-[70vh] items-center justify-center">
	<div class="space-y-4">
		<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
			<PromptInput.Body>
				<PromptInput.Textarea />
			</PromptInput.Body>
			<PromptInput.Toolbar class="justify-end">
				<PromptInput.Submit status={chat.status} />
			</PromptInput.Toolbar>
		</PromptInput.Root>
		<div class="rounded-md border p-4 max-w-xl">
			{#if chat.messages.length > 0}
				<h2 class="text-lg font-bold">Chat Messages:</h2>
				<ul class="list-disc pl-5">
					{#each chat.messages as message}
						<div>{message.role}</div>
						{#each message.parts as part}
							{#if part.type === "text"}
								<p>{part.text}</p>
							{/if}
						{/each}
					{/each}
				</ul>
			{:else}
				<p>No messages yet.</p>
			{/if}
		</div>
	</div>
</div>
