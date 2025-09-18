import { getContext, setContext } from 'svelte';

/**
 * Context value type for Chain of Thought components
 */
export type ChainOfThoughtContextValue = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};

/**
 * Unique key for Chain of Thought context
 */
const CHAIN_OF_THOUGHT_CONTEXT_KEY = crypto.randomUUID();

/**
 * Sets the Chain of Thought context
 * @param value - The context value to set
 */
export function setChainOfThoughtContext(value: ChainOfThoughtContextValue): void {
	setContext(CHAIN_OF_THOUGHT_CONTEXT_KEY, value);
}

/**
 * Gets the Chain of Thought context
 * @throws Error if used outside of ChainOfThought component
 * @returns The Chain of Thought context value
 */
export function getChainOfThoughtContext(): ChainOfThoughtContextValue {
	const context = getContext<ChainOfThoughtContextValue>(CHAIN_OF_THOUGHT_CONTEXT_KEY);

	if (!context) {
		throw new Error(
			'ChainOfThought components must be used within ChainOfThought'
		);
	}

	return context;
}