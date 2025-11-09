<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { Dialog as DialogPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import type { Snippet } from "svelte";

	let {
		open = $bindable(false),
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.RootProps> & {
		children: Snippet;
	} = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	{@render children()}
</Dialog.Root>
