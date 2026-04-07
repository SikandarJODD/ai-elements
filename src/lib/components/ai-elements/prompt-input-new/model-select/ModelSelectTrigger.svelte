<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<Select.Trigger
	class={cn(
		"text-muted-foreground border-none bg-transparent font-medium shadow-none transition-colors",
		'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
		className
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</Select.Trigger>
