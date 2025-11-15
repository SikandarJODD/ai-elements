<script lang="ts">
	import {
		PromptInputController,
		setPromptInputController,
	} from "./prompt-input-context.svelte.js";
	import type { PromptInputProviderProps } from "./types.js";

	let {
		initialInput = "",
		accept,
		multiple = true,
		maxFiles,
		maxFileSize,
		onError,
		children,
	}: PromptInputProviderProps = $props();

	// Create the controller instance
	const controller = new PromptInputController(
		initialInput,
		accept,
		multiple,
		maxFiles,
		maxFileSize,
		onError
	);

	// Set the controller in context
	setPromptInputController(controller);
</script>

{#if children}
	{@render children()}
{/if}

