<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { Button, type ButtonProps } from "$lib/components/ui/button/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import type { Snippet } from "svelte";

	interface Props extends Omit<ButtonProps, "children"> {
		tooltip?: string;
		label?: string;
		class?: string;
		children?: Snippet;
	}

	let {
		tooltip,
		label,
		variant = "ghost",
		size = "icon",
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						{size}
						type="button"
						{variant}
						class={cn("size-7", className)}
						{...restProps}
					>
						{@render children?.()}
						<span class="sr-only">{label || tooltip}</span>
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{tooltip}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	<Button {size} type="button" {variant} class={cn("size-7", className)} {...restProps}>
		{@render children?.()}
		{#if label}
			<span class="sr-only">{label}</span>
		{/if}
	</Button>
{/if}
