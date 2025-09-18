import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';

export type BranchContextType = {
	currentBranch: number;
	totalBranches: number;
	goToPrevious: () => void;
	goToNext: () => void;
	branches: Snippet[];
	setBranches: (branches: Snippet[]) => void;
};

const BRANCH_CONTEXT_KEY = Symbol('branch-context');

export function setBranchContext(context: BranchContextType) {
	return setContext(BRANCH_CONTEXT_KEY, context);
}

export function getBranchContext(): BranchContextType {
	const context = getContext<BranchContextType>(BRANCH_CONTEXT_KEY);

	if (!context) {
		throw new Error('Branch components must be used within Branch');
	}

	return context;
}