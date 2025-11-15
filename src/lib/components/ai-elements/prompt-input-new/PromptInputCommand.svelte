<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		value?: string;
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { value = $bindable(""), class: className, children, ...props }: Props = $props();
</script>

<Command.Root bind:value class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Command.Root>

