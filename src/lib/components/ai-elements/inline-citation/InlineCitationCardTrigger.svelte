<script lang="ts">
	import { cn } from "$lib/utils";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import type { Snippet } from "svelte";

	type Props = {
		sources: string[];
		children?: Snippet;
		class?: string;
		variant?: "default" | "secondary" | "destructive" | "outline";
	};

	let {
		sources,
		children,
		class: className,
		variant = "secondary",
		...restProps
	}: Props = $props();

	const badgeContent = $derived.by(() => {
		if (!sources.length) return "unknown";

		try {
			const hostname = new URL(sources[0]).hostname;
			return sources.length > 1 ? `${hostname} +${sources.length - 1}` : hostname;
		} catch {
			return sources.length > 1 ? `${sources[0]} +${sources.length - 1}` : sources[0];
		}
	});
</script>

<HoverCard.Trigger>
	<Badge class={cn("ml-1 rounded-full", className)} {variant} {...restProps}>
		{#if children}
			{@render children()}
		{:else}
			{badgeContent}
		{/if}
	</Badge>
</HoverCard.Trigger>
