<script lang="ts">
	import { Button, type ButtonProps } from "$lib/components/ui/button";
	import HoverCardTrigger from "$lib/components/ui/hover-card/hover-card-trigger.svelte";
	import ContextIcon from "./context-icon.svelte";
	import { getContextValue } from "./context-context.svelte";

	interface Props extends ButtonProps {
		children?: import("svelte").Snippet;
		[key: string]: any;
	}

	let { children, variant = "ghost", ...props }: Props = $props();

	const context = getContextValue();
</script>

<HoverCardTrigger>
	{#if children}
		{@render children()}
	{:else}
		<Button type="button" {variant} {...props}>
			<span class="text-muted-foreground font-medium">
				{context.displayPercent}
			</span>
			<ContextIcon />
		</Button>
	{/if}
</HoverCardTrigger>
