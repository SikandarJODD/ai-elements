<script lang="ts">
	import { cn } from "$lib/utils";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className, ...restProps }: Props = $props();
</script>

<HoverCard.Content class={cn("relative w-80 p-0", className)} {...restProps}>
	{@render children()}
</HoverCard.Content>
