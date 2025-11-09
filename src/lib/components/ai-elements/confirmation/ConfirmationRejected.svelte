<script lang="ts" module>
	import type { Snippet } from "svelte";

	export interface ConfirmationRejectedProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getConfirmationContext } from "./confirmation-context.svelte.js";

	let { children }: ConfirmationRejectedProps = $props();

	const context = getConfirmationContext();

	// Only show when rejected and in response states
	let shouldShow = $derived(
		context.approval?.approved === false &&
			(context.state === "approval-responded" ||
				context.state === "output-denied" ||
				context.state === "output-available")
	);
</script>

{#if shouldShow}
	{@render children?.()}
{/if}
