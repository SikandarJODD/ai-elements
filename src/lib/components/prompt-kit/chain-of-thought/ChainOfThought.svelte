<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";

	interface ChainOfThoughtProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children }: ChainOfThoughtProps = $props();
</script>

<div class={cn("space-y-0", className)}>
	{#if children}
		{@render children()}
	{/if}
</div>
