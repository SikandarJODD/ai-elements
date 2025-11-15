<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		heading?: string;
		value?: string;
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { heading, value, class: className, children, ...props }: Props = $props();
</script>

<Command.Group {heading} {value} class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Command.Group>
