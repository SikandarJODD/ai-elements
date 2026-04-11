<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";

	function handleSubmit(message: Message) {
		console.log("Files", message.files);
		console.log("Message", message.text);
	}
</script>

<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
	<PromptInput.Body>
		<PromptInput.Textarea />
	</PromptInput.Body>
	<PromptInput.Toolbar class="justify-end">
		<PromptInput.Submit />
	</PromptInput.Toolbar>
</PromptInput.Root>
