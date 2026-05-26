<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import { Chat } from "@ai-sdk/svelte";

	let chat = new Chat({});

	function handleSubmit(message: Message) {
		chat.sendMessage({
			text: message.text,
		});
	}
</script>

<div class="space-y-4">
	<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
		<PromptInput.Body>
			<PromptInput.Textarea />
		</PromptInput.Body>

		<PromptInput.Toolbar class="justify-end">
			<PromptInput.Submit />
		</PromptInput.Toolbar>
	</PromptInput.Root>

	<!-- Showcase messages -->
	{#if chat.messages.length > 0}
		<main class="max-w-xl p-2">
			<ul>
				{#each chat.messages as message, messageIndex (messageIndex)}
					<li>
						<div class="text-base font-semibold">{message.role}</div>
						<div>
							{#each message.parts as part, partIndex (partIndex)}
								{#if part.type === "text"}
									<div class="text-muted-foreground text-sm">{part.text}</div>
								{/if}
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		</main>
	{:else}
		<p class="text-muted-foreground pl-0.5 text-sm">Please send message to view response...</p>
	{/if}
</div>
