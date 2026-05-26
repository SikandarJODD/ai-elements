<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children?: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div class={cn("flex-1 overflow-auto p-4", className)} {...restProps}>
	{@render children?.()}
</div>
