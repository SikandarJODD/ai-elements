<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { CornerDownLeft, Loader2, Square, X } from "@lucide/svelte/icons";
	import type { PromptInputSubmitProps } from "./types.js";

	let {
		class: className,
		variant = "default",
		size = "icon",
		status,
		children,
		...props
	}: PromptInputSubmitProps = $props();

	const Icon = $derived.by(() => {
		if (status === "submitted") {
			return Loader2;
		} else if (status === "streaming") {
			return Square;
		} else if (status === "error") {
			return X;
		}
		return CornerDownLeft;
	});

	const iconClass = $derived.by(() => {
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
		<Icon class={iconClass} />
	{/if}
</Button>
