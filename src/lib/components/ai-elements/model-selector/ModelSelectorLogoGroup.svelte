<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>
