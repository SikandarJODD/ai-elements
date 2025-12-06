<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { getMessageBranchContext } from "./message-context.svelte.js";
	import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
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
