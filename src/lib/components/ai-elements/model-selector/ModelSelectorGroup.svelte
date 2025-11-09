<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		heading,
		children,
		...restProps
	}: WithoutChildrenOrChild<CommandPrimitive.GroupProps> & {
		children: Snippet;
		heading?: string;
	} = $props();
</script>

<Command.Group bind:ref {heading} {...restProps}>
	{@render children()}
</Command.Group>
