<script lang="ts">
	import { cn } from "$lib/utils";
	import {
		MessageBranchController,
		setMessageBranchContext,
	} from "../context/message-context.svelte.js";
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

	const branchContext = new MessageBranchController();
	setMessageBranchContext(branchContext);

	let initialized = $state(false);
	let previousBranch = $state<number | null>(null);

	$effect.pre(() => {
		if (!initialized) {
			branchContext.setCurrentBranch(defaultBranch);
			previousBranch = branchContext.currentBranch;
			initialized = true;
		}
	});

	$effect(() => {
		const currentBranch = branchContext.currentBranch;

		if (previousBranch === null) {
			previousBranch = currentBranch;
			return;
		}

		if (currentBranch !== previousBranch) {
			previousBranch = currentBranch;
			onBranchChange?.(currentBranch);
		}
	});
</script>

<div class={cn("grid w-full gap-2 [&>div]:pb-0", className)} {...restProps}>
	{@render children()}
</div>
