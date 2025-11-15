<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		value: string;
		onSelect?: (value: string) => void;
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { value, onSelect, class: className, children, ...props }: Props = $props();
</script>

<Command.Item {value} {onSelect} class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Command.Item>

