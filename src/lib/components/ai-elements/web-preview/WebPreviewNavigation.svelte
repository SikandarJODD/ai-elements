<script lang="ts">
	import { cn } from "$lib/utils";

	let {
		class: className,
		children,
		...restProps
	}: {
		class?: string;
		children: import("svelte").Snippet;
		[key: string]: any;
	} = $props();
</script>

<div class={cn("flex items-center gap-1 border-b p-2", className)} {...restProps}>
	{@render children()}
</div>
