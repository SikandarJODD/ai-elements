<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive, Dialog as DialogPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils";
	import type { Snippet } from "svelte";

	let {
		open = $bindable(false),
		ref = $bindable(null),
		value = $bindable(""),
		title = "Model Selector",
		description = "Search for a model",
		portalProps,
		children,
		...rest
	}: WithoutChildrenOrChild<DialogPrimitive.RootProps> &
		WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
			portalProps?: DialogPrimitive.PortalProps;
			children: Snippet;
			title?: string;
			description?: string;
		} = $props();
</script>
<!-- ...rest props removed for now -->
<Command.Dialog bind:open bind:ref bind:value {title} {description} {portalProps}>
	{@render children()}
</Command.Dialog>
