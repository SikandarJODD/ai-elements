<script lang="ts" module>
	import type { Snippet } from "svelte";

	export interface ConfirmationRequestProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getConfirmationContext } from "./confirmation-context.svelte.js";

	let { children }: ConfirmationRequestProps = $props();

	const context = getConfirmationContext();

	// Only show when approval is requested
	let shouldShow = $derived(context.state === "approval-requested");
</script>

{#if shouldShow}
	{@render children?.()}
{/if}
