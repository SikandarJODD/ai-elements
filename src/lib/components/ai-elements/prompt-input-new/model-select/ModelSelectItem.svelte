<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		class?: string;
		value: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, value, children, ...props }: Props = $props();
</script>

<Select.Item class={cn(className)} {value} {...props}>
	{#if children}
		{@render children()}
	{/if}
</Select.Item>
