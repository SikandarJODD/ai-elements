<script lang="ts" module>
	import type { Snippet } from "svelte";

	export interface CheckpointTriggerProps {
		children?: Snippet;
		class?: string;
		variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
		size?: "default" | "sm" | "lg" | "icon";
		tooltip?: string;
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger,
	} from "$lib/components/ui/tooltip";

	let {
		children,
		class: className,
		variant = "ghost",
		size = "sm",
		tooltip,
		onclick,
		disabled = false,
		...restProps
	}: CheckpointTriggerProps = $props();
</script>

{#if tooltip}
	<TooltipProvider>
		<Tooltip delayDuration={150}>
			<TooltipTrigger>
				<Button
					{size}
					type="button"
					{variant}
					{onclick}
					{disabled}
					class={className}
					{...restProps}
				>
					{@render children?.()}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom" align="start">
				<p>{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
{:else}
	<Button {size} type="button" {variant} {onclick} {disabled} class={className} {...restProps}>
		{@render children?.()}
	</Button>
{/if}
