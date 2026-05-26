<script lang="ts">
	import { cn } from "$lib/utils";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface ChainOfThoughtSearchResultProps extends HTMLAttributes<HTMLElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: ChainOfThoughtSearchResultProps = $props();
</script>

<Badge
	class={cn("gap-1 px-2 py-0.5 text-xs font-normal", className)}
	variant="secondary"
	{...restProps}
>
	{@render children()}
</Badge>
