<script lang="ts">
	import { Button, type ButtonProps } from "$lib/components/ui/button/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	type MessageButtonProps = Omit<ButtonProps, "children" | "type" | "href">;

	type Props = MessageButtonProps & {
		tooltip?: string;
		label?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		tooltip,
		label,
		variant = "ghost",
		size = "icon",
		class: className,
		children,
		...restProps
	}: Props = $props();

	const srOnlyLabel = $derived(label || tooltip);
</script>

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						{...restProps}
						{size}
						type="button"
						{variant}
						class={cn("size-7", className)}
					>
						{@render children?.()}
						{#if srOnlyLabel}
							<span class="sr-only">{srOnlyLabel}</span>
						{/if}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{tooltip}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	<Button {...restProps} {size} type="button" {variant} class={cn("size-7", className)}>
		{@render children?.()}
		{#if srOnlyLabel}
			<span class="sr-only">{srOnlyLabel}</span>
		{/if}
	</Button>
{/if}
