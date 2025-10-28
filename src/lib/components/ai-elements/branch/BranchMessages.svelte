<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { getBranchContext } from "./branch-context.js";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet[];
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const { currentBranch, setBranches, branches } = getBranchContext();

	// Update branches when children change
	$effect(() => {
		if (branches.length !== children.length) {
			setBranches(children);
		}
	});
</script>

{#each children as branch, index (globalThis.crypto.randomUUID())}
	<div
		class={cn(
			"grid gap-2 overflow-hidden [&>div]:pb-0",
			index === currentBranch ? "block" : "hidden"
		)}
		{...restProps}
	>
		{@render branch()}
	</div>
{/each}
