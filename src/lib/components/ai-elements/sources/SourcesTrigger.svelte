<script lang="ts">
	import { CollapsibleTrigger } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";

	interface Props {
		class?: string;
		count: number;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className = "", count, children, ...restProps }: Props = $props();

	let id = $derived.by(() => crypto.randomUUID());
</script>

<CollapsibleTrigger {id} class={cn("flex items-center gap-2", className)} {...restProps}>
	{#if children}
		{@render children?.()}
	{:else}
		<p class="font-medium">Used {count} sources</p>
		<ChevronDownIcon class="h-4 w-4" />
	{/if}
</CollapsibleTrigger>
