<script lang="ts">
	import MonitorIcon from "@lucide/svelte/icons/monitor";
	import type { ComponentProps, Snippet } from "svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { getAttachments } from "../core/context.js";
	import { captureScreenshot } from "../core/utils.js";

	export type AddScreenshotProps = ComponentProps<typeof DropdownMenu.Item> & {
		children?: Snippet;
		label?: string;
	};

	let {
		children,
		label = "Take screenshot",
		onSelect,
		...restProps
	}: AddScreenshotProps = $props();

	const attachments = getAttachments();

	async function handleSelect(event: Event) {
		onSelect?.(event);
		if (event.defaultPrevented) {
			return;
		}

		try {
			const screenshot = await captureScreenshot();
			if (screenshot) {
				attachments.add([screenshot], "screenshot");
			}
		} catch (error) {
			if (
				error instanceof DOMException &&
				(error.name === "NotAllowedError" || error.name === "AbortError")
			) {
				return;
			}

			throw error;
		}
	}
</script>

<DropdownMenu.Item onSelect={handleSelect} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<MonitorIcon class="mr-2 size-4" />
		{label}
	{/if}
</DropdownMenu.Item>
