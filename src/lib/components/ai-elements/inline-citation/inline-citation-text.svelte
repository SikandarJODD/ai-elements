<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = HTMLAttributes<HTMLSpanElement> & {
		children: Snippet;
		class?: string;
	};

	let { children, class: className, ...restProps }: Props = $props();
</script>

<span class={cn("group-hover:bg-accent transition-colors", className)} {...restProps}>
	{@render children()}
</span>
