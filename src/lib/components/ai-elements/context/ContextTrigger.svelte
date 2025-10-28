<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import HoverCardTrigger from "$lib/components/ui/hover-card/hover-card-trigger.svelte";
	import ContextIcon from "./ContextIcon.svelte";
	import { getContextValue } from "./context-context.svelte";

	interface Props {
		children?: import("svelte").Snippet;
		variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
		size?: "default" | "sm" | "lg" | "icon";
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
