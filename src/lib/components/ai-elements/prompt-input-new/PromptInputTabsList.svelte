<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<Tabs.List class={cn(className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Tabs.List>
