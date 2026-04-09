<script lang="ts">
	import { onDestroy, untrack } from "svelte";
	import { Controller, setPromptInputProvider } from "../context/provider.svelte.js";

	interface Props {
		initialInput?: string;
		accept?: string;
		multiple?: boolean;
		children?: import("svelte").Snippet;
	}

	let { initialInput = "", accept, multiple = true, children }: Props = $props();

	let controller = new Controller(
		untrack(() => initialInput),
		untrack(() => accept),
		untrack(() => multiple)
	);

	setPromptInputProvider(controller);

	onDestroy(() => {
		controller.attachments.destroy();
	});
</script>

{#if children}
	{@render children()}
{/if}
