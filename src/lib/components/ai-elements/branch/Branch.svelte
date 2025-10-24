<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { setBranchContext, type BranchContextType } from './branch-context.js';
	import type { Snippet } from 'svelte';

	interface Props {
		defaultBranch?: number;
		onBranchChange?: (branchIndex: number) => void;
		class?: string;
		children: Snippet;
		[key: string]: any;
	}

	let {
		defaultBranch = 0,
		onBranchChange,
		class: className,
		children,
		...restProps
	}: Props = $props();

	let currentBranch = $state(defaultBranch);
	let branches = $state<Snippet[]>([]);

	function handleBranchChange(newBranch: number) {
		currentBranch = newBranch;
		onBranchChange?.(newBranch);
	}

	function goToPrevious() {
		const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
		handleBranchChange(newBranch);
	}

	function goToNext() {
		const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
		handleBranchChange(newBranch);
	}

	function setBranches(newBranches: Snippet[]) {
		branches = newBranches;
	}

	const contextValue: BranchContextType = {
		get currentBranch() {
			return currentBranch;
		},
		get totalBranches() {
			return branches.length;
		},
		goToPrevious,
		goToNext,
		get branches() {
			return branches;
		},
		setBranches
	};

	setBranchContext(contextValue);
</script>

<div class={cn('grid w-full gap-2 [&>div]:pb-0', className)} {...restProps}>
	{@render children()}
</div>