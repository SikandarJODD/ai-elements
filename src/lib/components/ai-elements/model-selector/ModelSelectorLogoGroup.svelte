<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"[&>img]:bg-background dark:[&>img]:bg-foreground flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:p-px [&>img]:ring-1",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>
