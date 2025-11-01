<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	interface ChainOfThoughtItemProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: ChainOfThoughtItemProps = $props();
</script>

<div class={cn("text-muted-foreground text-sm", className)} {...restProps}>
	{@render children?.()}
</div>
