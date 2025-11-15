<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>

