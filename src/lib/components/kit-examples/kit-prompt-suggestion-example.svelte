<script lang="ts">
	import {
		PromptInput,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { PromptSuggestion } from "$lib/components/prompt-kit/prompt-suggestion";
	import { Button } from "$lib/components/ui/button";
	import { ArrowUp } from "@lucide/svelte";

	let inputValue = $state("");

	function handleSend() {
		if (inputValue.trim()) {
			console.log("Sending:", inputValue);
			inputValue = "";
		}
	}

	function handleValueChange(value: string) {
		inputValue = value;
	}
</script>

<div class="flex w-full flex-col space-y-4">
	<div class="flex flex-wrap gap-2">
		<PromptSuggestion onclick={() => (inputValue = "Tell me a joke")}>
			Tell me a joke
		</PromptSuggestion>

		<PromptSuggestion onclick={() => (inputValue = "How does this work?")}>
			How does this work?
		</PromptSuggestion>

		<PromptSuggestion onclick={() => (inputValue = "Generate an image of a cat")}>
			Generate an image of a cat
		</PromptSuggestion>

		<PromptSuggestion onclick={() => (inputValue = "Write a poem")}>
			Write a poem
		</PromptSuggestion>

		<PromptSuggestion onclick={() => (inputValue = "Code a Svelte component")}>
			Code a Svelte component
		</PromptSuggestion>
	</div>

	<PromptInput
		class="border-input bg-background border shadow-xs"
		value={inputValue}
		onValueChange={handleValueChange}
		onSubmit={handleSend}
	>
		<PromptInputTextarea placeholder="Type a message or click a suggestion..." />
		<PromptInputActions class="justify-end">
			<Button
				size="sm"
				class="size-9 cursor-pointer rounded-full"
				onclick={handleSend}
				disabled={!inputValue.trim()}
				aria-label="Send"
			>
				<ArrowUp class="h-4 w-4" />
			</Button>
		</PromptInputActions>
	</PromptInput>
</div>
