<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		value?: string;
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { value = $bindable(""), class: className, children, ...props }: Props = $props();
</script>

<Tabs.Root bind:value class={cn("flex flex-col gap-2", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Tabs.Root>

