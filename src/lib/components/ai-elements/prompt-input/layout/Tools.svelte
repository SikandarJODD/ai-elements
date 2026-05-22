<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<div
	class={cn("flex items-center gap-1", "[&_button:first-child]:rounded-bl-xl", className)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</div>
