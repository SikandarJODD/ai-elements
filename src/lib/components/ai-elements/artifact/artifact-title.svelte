<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		class?: string;
		children?: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<p class={cn("text-foreground text-sm font-medium", className)} {...restProps}>
	{@render children?.()}
</p>
