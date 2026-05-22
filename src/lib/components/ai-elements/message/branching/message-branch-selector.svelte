<script lang="ts">
	import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getMessageBranchContext } from "../context/message-context.svelte.js";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const branchContext = getMessageBranchContext();

	let shouldRender = $derived(branchContext.totalBranches > 1);
</script>

{#if shouldRender}
	<ButtonGroup.Root
		class={cn(
			"[&>*:not(:first-child)]:rounded-l-md [&>*:not(:last-child)]:rounded-r-md",
			className
		)}
		orientation="horizontal"
		{...restProps}
	>
		{@render children?.()}
	</ButtonGroup.Root>
{/if}
