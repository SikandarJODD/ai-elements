<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("hover:bg-accent flex items-center gap-2 px-3 py-2 text-xs", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>
