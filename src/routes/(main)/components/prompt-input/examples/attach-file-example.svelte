<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";

	function handleSubmit(message: Message) {
		console.log("Files", message.files);
		console.log("Message", message.text);
	}
</script>

<PromptInput.Root globalDrop multiple maxFiles={2} class="w-xl" onSubmit={handleSubmit}>
	<PromptInput.Attachments>
		{#snippet children(file)}
			<PromptInput.Attachment data={file} />
		{/snippet}
	</PromptInput.Attachments>
	<PromptInput.Body>
		<PromptInput.Textarea placeholder="Add Text + Files" />
	</PromptInput.Body>
	<PromptInput.Toolbar class="justify-end">
		<PromptInput.Submit />
	</PromptInput.Toolbar>
</PromptInput.Root>
