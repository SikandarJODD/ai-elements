<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children?: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn("bg-muted/50 flex items-center justify-between border-b px-4 py-3", className)}
	{...restProps}
>
	{@render children?.()}
</div>
