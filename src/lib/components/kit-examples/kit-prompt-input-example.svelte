<script lang="ts">
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ArrowUp, Square } from "@lucide/svelte";

	let input = $state("");
	let isLoading = $state(false);

	function handleSubmit() {
		isLoading = true;
		// simulate request
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}

	function handleValueChange(value: string) {
		input = value;
	}
</script>

<PromptInput
	value={input}
	onValueChange={handleValueChange}
	{isLoading}
	onSubmit={handleSubmit}
	class="w-full max-w-(--breakpoint-md)"
>
	<PromptInputTextarea placeholder="Ask me anything..." />
	<PromptInputActions class="justify-end pt-2">
		<PromptInputAction>
			{#snippet tooltip()}
				{isLoading ? "Stop generation" : "Send message"}
			{/snippet}
			<Button
				variant="default"
				size="icon"
				class="h-8 w-8 rounded-full"
				onclick={handleSubmit}
			>
				{#if isLoading}
					<Square class="size-5 fill-current" />
				{:else}
					<ArrowUp class="size-5" />
				{/if}
			</Button>
		</PromptInputAction>
	</PromptInputActions>
</PromptInput>
