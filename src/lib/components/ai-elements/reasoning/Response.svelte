<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className = "", children, ...props }: Props = $props();
</script>

<div class={cn("prose prose-sm max-w-none", className)} {...props}>
	{@render children?.()}
</div>
