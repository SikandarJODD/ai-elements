import { getContext, setContext } from 'svelte';

export type ToolState =
	| 'input-streaming'
	| 'input-available'
	| 'output-available'
	| 'output-error';

export type ToolPart = {
	type: string;
	state: ToolState;
	input?: Record<string, unknown>;
	output?: Record<string, unknown>;
	toolCallId?: string;
	errorText?: string;
};

export type ToolSchema = {
	toolPart: ToolPart;
	defaultOpen?: boolean;
};

export class ToolClass {
	toolPart = $state<ToolPart>() as ToolPart;
	isOpen = $state<boolean>(false);

	constructor(props: ToolSchema) {
		this.toolPart = props.toolPart;
		this.isOpen = props.defaultOpen ?? false;
	}

	toggleOpen() {
		this.isOpen = !this.isOpen;
	}

	setOpen(open: boolean) {
		this.isOpen = open;
	}
}

const TOOL_KEY = Symbol('tool');

export function setToolContext(contextInstance: ToolClass) {
	setContext(TOOL_KEY, contextInstance);
}

export function getToolContext(): ToolClass {
	const context = getContext<ToolClass>(TOOL_KEY);

	if (!context) {
		throw new Error('Tool subcomponents must be used within Tool');
	}

	return context;
}
