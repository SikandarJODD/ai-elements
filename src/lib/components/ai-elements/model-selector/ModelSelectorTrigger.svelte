<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { Dialog as DialogPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.TriggerProps> & {
		children: Snippet;
	} = $props();
</script>

<Dialog.Trigger bind:ref {...restProps}>
	{@render children()}
</Dialog.Trigger>
