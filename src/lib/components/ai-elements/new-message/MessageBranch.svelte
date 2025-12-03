<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import {
		MessageBranchClass,
		setMessageBranchContext,
	} from "./message-context.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		defaultBranch?: number;
		onBranchChange?: (branchIndex: number) => void;
		class?: string;
		children: Snippet;
	}

	let {
		defaultBranch = 0,
		onBranchChange,
		class: className,
		children,
		...restProps
	}: Props = $props();

	// Create the branch context class
	const branchContext = new MessageBranchClass(defaultBranch);

	// Set up the context
	setMessageBranchContext(branchContext);

	// Watch for branch changes and call the callback
	// Using $derived to track changes without $effect
	let previousBranch = $state(defaultBranch);

	$effect.pre(() => {
		if (branchContext.currentBranch !== previousBranch) {
			previousBranch = branchContext.currentBranch;
			onBranchChange?.(branchContext.currentBranch);
		}
	});
</script>

<div class={cn("grid w-full gap-2 [&>div]:pb-0", className)} {...restProps}>
	{@render children()}
</div>

