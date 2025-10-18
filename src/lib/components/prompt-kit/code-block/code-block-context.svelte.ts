import { getContext, setContext } from 'svelte';

export type CodeBlockSchema = {
	// Add any shared state if needed in the future
};

export class CodeBlockClass {
	// Placeholder for shared state management
	// Currently the CodeBlock component is mostly presentational
	// but this allows for future extensibility

	constructor(props?: CodeBlockSchema) {
		// Initialize any shared state here if needed
	}
}

const CODE_BLOCK_KEY = Symbol('code-block');

export function setCodeBlockContext(contextInstance: CodeBlockClass) {
	setContext(CODE_BLOCK_KEY, contextInstance);
}

export function getCodeBlockContext(): CodeBlockClass {
	const context = getContext<CodeBlockClass>(CODE_BLOCK_KEY);

	if (!context) {
		throw new Error('CodeBlock subcomponents must be used within CodeBlock');
	}

	return context;
}
