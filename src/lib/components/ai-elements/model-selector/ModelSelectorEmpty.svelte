<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithoutChildrenOrChild<CommandPrimitive.EmptyProps> & {
		children?: Snippet;
	} = $props();
</script>

<Command.Empty bind:ref {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Command.Empty>
