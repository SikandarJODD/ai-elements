<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithoutChildrenOrChild<CommandPrimitive.ListProps> & {
		children: Snippet;
	} = $props();
</script>

<Command.List bind:ref {...restProps}>
	{@render children()}
</Command.List>
