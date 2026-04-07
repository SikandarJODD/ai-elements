<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import * as InputGroup from "$lib/components/ui/input-group/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	export type ButtonTooltip =
		| string
		| {
				content?: Snippet;
				shortcut?: string;
				side?: ComponentProps<typeof Tooltip.Content>["side"];
				text?: string;
		  };

	export type ButtonProps = ComponentProps<typeof InputGroup.Button> & {
		tooltip?: ButtonTooltip;
	};

	let {
		ref = $bindable(null),
		children,
		class: className,
		size = "icon-sm",
		tooltip,
		type = "button",
		variant = "ghost",
		...restProps
	}: ButtonProps = $props();

	const tooltipSide = $derived(typeof tooltip === "string" ? "top" : (tooltip?.side ?? "top"));
	const tooltipShortcut = $derived(
		typeof tooltip === "string" ? undefined : tooltip?.shortcut,
	);
</script>

{#if tooltip}
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<InputGroup.Button
					bind:ref
					class={cn(className)}
					{size}
					{type}
					{variant}
					{...props}
					{...restProps}
				>
					{@render children?.()}
				</InputGroup.Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content side={tooltipSide}>
			{#if typeof tooltip === "string"}
				{tooltip}
			{:else if tooltip?.content}
				{@render tooltip.content()}
			{:else}
				{tooltip?.text}
			{/if}
			{#if tooltipShortcut}
				<span class="text-muted-foreground ml-2">{tooltipShortcut}</span>
			{/if}
		</Tooltip.Content>
	</Tooltip.Root>
{:else}
	<InputGroup.Button
		bind:ref
		class={cn(className)}
		{size}
		{type}
		{variant}
		{...restProps}
	>
		{@render children?.()}
	</InputGroup.Button>
{/if}
