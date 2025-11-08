<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { WithElementRef } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<Command.Shortcut bind:ref {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Command.Shortcut>
