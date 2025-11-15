<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("space-y-1", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>

