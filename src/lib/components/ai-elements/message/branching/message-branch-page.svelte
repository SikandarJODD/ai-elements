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
</script>

<ButtonGroup.Text
	class={cn("text-muted-foreground border-none bg-transparent shadow-none", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{branchContext.currentBranch + 1} of {branchContext.totalBranches}
	{/if}
</ButtonGroup.Text>
