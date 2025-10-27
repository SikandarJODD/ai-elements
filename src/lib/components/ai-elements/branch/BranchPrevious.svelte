<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { getBranchContext } from "./branch-context.js";
	import { Button } from "$lib/components/ui/button";
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const { goToPrevious, totalBranches } = getBranchContext();

	let isDisabled = $derived(totalBranches <= 1);
</script>

<Button
	aria-label="Previous branch"
	class={cn(
		"text-muted-foreground size-7 shrink-0 rounded-full transition-colors",
		"hover:bg-accent hover:text-foreground",
		"disabled:pointer-events-none disabled:opacity-50",
		className
	)}
	disabled={isDisabled}
	onclick={goToPrevious}
	size="icon"
	type="button"
	variant="ghost"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- ChevronLeftIcon equivalent - using SVG -->
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m15 18-6-6 6-6" />
		</svg>
	{/if}
</Button>
