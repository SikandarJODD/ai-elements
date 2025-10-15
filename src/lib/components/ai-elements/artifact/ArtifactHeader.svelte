<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
    children?: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"flex items-center justify-between border-b bg-muted/50 px-4 py-3",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>