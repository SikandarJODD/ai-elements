<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface ChainOfThoughtImageProps extends HTMLAttributes<HTMLDivElement> {
		caption?: string;
		children: Snippet;
		class?: string;
	}

	let { caption, children, class: className, ...restProps }: ChainOfThoughtImageProps = $props();
</script>

<div class={cn("mt-2 space-y-2", className)} {...restProps}>
	<div
		class="bg-muted relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-lg p-3"
	>
		{@render children()}
	</div>
	{#if caption}
		<p class="text-muted-foreground text-xs">{caption}</p>
	{/if}
</div>
