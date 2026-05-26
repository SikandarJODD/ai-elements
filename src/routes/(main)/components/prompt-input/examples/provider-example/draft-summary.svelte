<script lang="ts">
	import { usePromptInput } from "$lib/components/ai-elements/prompt-input";

	let promptInput = usePromptInput();

	let text = $derived(promptInput.textInput.value);
	let attachmentCount = $derived(promptInput.attachments.attachments.length);
	let hasDraft = $derived(text.trim().length > 0 || attachmentCount > 0);
</script>

<div class="max-w-xl rounded-xl border border-dashed p-3">
	<p class="text-sm font-medium">Live draft summary</p>
	<p class="text-muted-foreground mt-1 text-sm">Characters: {text.length}</p>
	<p class="text-muted-foreground text-sm">Attachments: {attachmentCount}</p>

	{#if hasDraft}
		<p class="mt-2 text-sm">
			<span class="font-medium">Preview:</span>
			{text.trim().length > 0
				? text.slice(0, 120)
				: "Waiting for text, attachments already added."}
		</p>
	{:else}
		<p class="text-muted-foreground mt-2 text-sm">Nothing in the draft yet.</p>
	{/if}
</div>
