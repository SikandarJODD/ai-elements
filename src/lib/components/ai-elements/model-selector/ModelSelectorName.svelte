<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	type Props = HTMLAttributes<HTMLSpanElement> & {
		children: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<span class={cn("flex-1 truncate text-left", className)} {...restProps}>
	{@render children()}
</span>
