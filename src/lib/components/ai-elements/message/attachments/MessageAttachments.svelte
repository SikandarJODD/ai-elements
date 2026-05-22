<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();

	let hasChildren = $derived(!!children);
</script>

{#if hasChildren}
	<div class={cn("ml-auto flex w-fit flex-wrap items-start gap-2", className)} {...restProps}>
		{@render children?.()}
	</div>
{/if}
