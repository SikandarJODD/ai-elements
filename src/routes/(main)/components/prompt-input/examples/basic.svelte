<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";

	import { Chat } from "@ai-sdk/svelte";
	let chat = new Chat({});

	function handleSubmit(message: Message) {
		chat.sendMessage({
			text: message.text,
			files: message.files,
		});
	}
</script>

<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
	<PromptInput.Body>
		<PromptInput.Textarea />
	</PromptInput.Body>
	<PromptInput.Toolbar class="justify-end">
		<PromptInput.Submit status={chat.status} />
	</PromptInput.Toolbar>
</PromptInput.Root>
