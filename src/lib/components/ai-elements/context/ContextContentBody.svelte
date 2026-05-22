<script lang="ts">
	import { cn } from "$lib/utils";
	interface Props {
		children?: import("svelte").Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn("w-full p-3", className)} {...props}>
	{@render children?.()}
</div>
