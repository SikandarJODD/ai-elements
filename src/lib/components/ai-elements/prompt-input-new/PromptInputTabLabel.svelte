<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...props }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3 class={cn("text-muted-foreground mb-2 px-3 text-xs font-medium", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</h3>

