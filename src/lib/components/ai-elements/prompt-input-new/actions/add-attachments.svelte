<script lang="ts">
	import ImageIcon from "@lucide/svelte/icons/image";
	import type { ComponentProps, Snippet } from "svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { getAttachments } from "../core/context.js";

	export type AddAttachmentsProps = ComponentProps<typeof DropdownMenu.Item> & {
		children?: Snippet;
		label?: string;
	};

	let {
		children,
		label = "Add photos or files",
		onSelect,
		...restProps
	}: AddAttachmentsProps = $props();

	const attachments = getAttachments();

	function handleSelect(event: Event) {
		onSelect?.(event);
		if (event.defaultPrevented) {
			return;
		}

		attachments.openFileDialog();
	}
</script>

<DropdownMenu.Item onSelect={handleSelect} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<ImageIcon class="mr-2 size-4" />
		{label}
	{/if}
</DropdownMenu.Item>
