<script lang="ts">
	import type { ComponentProps } from "svelte";
	import CornerDownLeftIcon from "@lucide/svelte/icons/corner-down-left";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import SquareIcon from "@lucide/svelte/icons/square";
	import XIcon from "@lucide/svelte/icons/x";
	import * as InputGroup from "$lib/components/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import type { PromptInputStatus } from "../core/types.js";

	export type SubmitProps = Omit<ComponentProps<typeof InputGroup.Button>, "type"> & {
		onStop?: () => void;
		status?: PromptInputStatus;
	};

	let {
		ref = $bindable(null),
		children,
		class: className,
		onclick,
		onStop,
		size = "icon-sm",
		status = "ready",
		variant = "default",
		...restProps
	}: SubmitProps = $props();

	const isGenerating = $derived(status === "submitted" || status === "streaming");

	function handleClick(event: MouseEvent) {
		if (isGenerating && onStop) {
			event.preventDefault();
			onStop();
			return;
		}

		onclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
	}
</script>

<InputGroup.Button
	bind:ref
	aria-label={isGenerating ? "Stop" : "Submit"}
	class={cn(className)}
	onclick={handleClick}
	size={size}
	type={isGenerating && onStop ? "button" : "submit"}
	variant={variant}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if status === "submitted"}
		<LoaderCircleIcon class="size-4 animate-spin" />
	{:else if status === "streaming"}
		<SquareIcon class="size-4" />
	{:else if status === "error"}
		<XIcon class="size-4" />
	{:else}
		<CornerDownLeftIcon class="size-4" />
	{/if}
</InputGroup.Button>
