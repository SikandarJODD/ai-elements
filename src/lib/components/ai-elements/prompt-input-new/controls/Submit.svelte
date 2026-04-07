<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button";
	import type { ButtonProps } from "$lib/components/ui/button/index.js";
	import type { ChatStatus } from "../context/types.js";
	import Loader2Icon from "../icons/Loader2Icon.svelte";
	import SendIcon from "../icons/SendIcon.svelte";
	import SquareIcon from "../icons/SquareIcon.svelte";
	import XIcon from "../icons/XIcon.svelte";

	interface Props extends ButtonProps {
		class?: string;
		status?: ChatStatus;
		children?: import("svelte").Snippet;
	}

	let {
		class: className,
		variant = "default",
		size = "icon",
		status,
		children,
		...props
	}: Props = $props();

	let Icon = $derived.by(() => {
		if (status === "submitted") {
			return Loader2Icon;
		} else if (status === "streaming") {
			return SquareIcon;
		} else if (status === "error") {
			return XIcon;
		}
		return SendIcon;
	});

	let iconClass = $derived.by(() => {
		if (status === "submitted") {
			return "size-4 animate-spin";
		}
		return "size-4";
	});
</script>

<Button class={cn("gap-1.5 rounded-lg", className)} {size} type="submit" {variant} {...props}>
	{#if children}
		{@render children()}
	{:else}
		<!-- <svelte:component this={Icon} class={iconClass} /> -->
		<Icon class={iconClass} />
	{/if}
</Button>
