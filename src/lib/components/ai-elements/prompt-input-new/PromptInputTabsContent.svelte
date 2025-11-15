<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		value: string;
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { value, class: className, children, ...props }: Props = $props();
</script>

<Tabs.Content {value} class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Tabs.Content>
