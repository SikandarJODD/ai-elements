<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<Command.Empty class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{:else}
		No results found.
	{/if}
</Command.Empty>

