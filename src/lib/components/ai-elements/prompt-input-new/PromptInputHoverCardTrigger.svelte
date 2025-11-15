<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<HoverCard.Trigger class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</HoverCard.Trigger>
