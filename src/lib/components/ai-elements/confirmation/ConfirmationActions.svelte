<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface ConfirmationActionsProps
		extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getConfirmationContext } from "./confirmation-context.svelte.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: ConfirmationActionsProps = $props();

	const context = getConfirmationContext();

	// Only show when approval is requested
	let shouldShow = $derived(context.state === "approval-requested");
</script>

{#if shouldShow}
	<div
		bind:this={ref}
		class={cn("flex items-center justify-end gap-2 self-end", className)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}
