<script lang="ts">
	import { cn } from "$lib/utils/utils";

	let {
		children,
		class: className,
		...restProps
	}: {
		children?: import("svelte").Snippet;
		class?: string;
		[key: string]: any;
	} = $props();
</script>

<div class={cn("flex w-full flex-col", className)} {...restProps}>
	{@render children?.()}
</div>
