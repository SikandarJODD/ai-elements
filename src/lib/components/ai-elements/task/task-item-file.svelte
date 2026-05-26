<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	export interface TaskItemFileProps extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: TaskItemFileProps = $props();
</script>

<div
	class={cn(
		"bg-secondary text-foreground inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
