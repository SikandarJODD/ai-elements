<script lang="ts">
	import { usePromptInput } from "$lib/components/ai-elements/prompt-input";
	import { Button } from "$lib/components/ui/button";

	let promptInput = usePromptInput();

	let hasDraft = $derived(
		promptInput.textInput.value.trim().length > 0 ||
			promptInput.attachments.attachments.length > 0
	);

	function setTemplate(text: string) {
		promptInput.textInput.setInput(text);
	}

	function clearDraft() {
		promptInput.textInput.clear();
		promptInput.attachments.clear();
	}
</script>

<div class="flex max-w-xl flex-wrap gap-2">
	<Button
		size="sm"
		variant="outline"
		onclick={() => setTemplate("Summarize these notes into three actionable bullet points.")}
	>
		Summarize
	</Button>
	<Button
		size="sm"
		variant="outline"
		onclick={() => setTemplate("Turn this rough draft into a customer-ready email.")}
	>
		Email
	</Button>
	<Button size="sm" variant="outline" onclick={clearDraft} disabled={!hasDraft}>
		Clear draft
	</Button>
</div>
