<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button, type ButtonProps } from "$lib/components/ui/button/index.js";
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger,
	} from "$lib/components/ui/tooltip/index.js";

	export type ActionProps = ButtonProps & {
		tooltip?: string;
		label?: string;
	};

	let {
		tooltip,
		children,
		label,
		class: className,
		variant = "ghost",
		size = "sm",
		...restProps
	}: ActionProps = $props();

	let buttonClasses = $derived(
		cn("text-muted-foreground hover:text-foreground relative size-9 p-1.5", className)
	);
</script>

{#if tooltip}
	<TooltipProvider>
		<Tooltip delayDuration={150}>
			<TooltipTrigger>
				<Button class={buttonClasses} {size} type="button" {variant} {...restProps}>
					{@render children?.()}
					<span class="sr-only">{label || tooltip}</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
{:else}
	<Button class={buttonClasses} {size} type="button" {variant} {...restProps}>
		{@render children?.()}
		<span class="sr-only">{label || tooltip}</span>
	</Button>
{/if}
