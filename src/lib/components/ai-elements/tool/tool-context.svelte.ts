import { getContext, setContext } from "svelte";
import { watch } from "runed";

export type ToolUIPartType = string;
export type ToolUIPartState =
	| "input-streaming"
	| "input-available"
	| "output-available"
	| "output-error";

export type ToolSchema = {
	type: ToolUIPartType;
	state: ToolUIPartState;
	input?: any;
	output?: any;
	errorText?: string;
	isOpen?: boolean;
};

export class ToolClass {
	type = $state<ToolUIPartType>("");
	state = $state<ToolUIPartState>("input-streaming");
	input = $state<any>(undefined);
	output = $state<any>(undefined);
	errorText = $state<string | undefined>(undefined);
	isOpen = $state<boolean>(false);

	constructor(props: ToolSchema) {
		this.type = props.type;
		this.state = props.state;
		this.input = props.input;
		this.output = props.output;
		this.errorText = props.errorText;
		this.isOpen = props.isOpen ?? false;

		// Watch for state changes and automatically handle tool opening/closing
		watch(
			() => this.state,
			(currentState, previousState) => {
				// Auto-open when tool starts processing
				if (currentState === "input-available" && !this.isOpen) {
					this.isOpen = true;
				}

				// Auto-close when tool completes with error (optional behavior)
				// Uncomment if you want this behavior:
				// if (currentState === 'output-error' && previousState !== 'output-error') {
				//   setTimeout(() => {
				//     this.isOpen = false;
				//   }, 3000);
				// }
			}
		);
	}

	get statusBadge() {
		let labels = {
			"input-streaming": "Pending",
			"input-available": "Running",
			"output-available": "Completed",
			"output-error": "Error",
		} as const;

		return {
			label: labels[this.state],
			variant: this.state === "output-error" ? "destructive" : "secondary",
		};
	}

	get hasOutput() {
		return !!(this.output || this.errorText);
	}

	get isComplete() {
		return this.state === "output-available" || this.state === "output-error";
	}

	get isRunning() {
		return this.state === "input-available";
	}

	get isPending() {
		return this.state === "input-streaming";
	}

	// Method to update tool state
	updateState(newState: ToolUIPartState) {
		this.state = newState;
	}

	// Method to set output
	setOutput(output: any) {
		this.output = output;
		this.errorText = undefined;
		this.state = "output-available";
	}

	// Method to set error
	setError(errorText: string) {
		this.errorText = errorText;
		this.output = undefined;
		this.state = "output-error";
	}

	// Method to toggle open state
	toggle() {
		this.isOpen = !this.isOpen;
	}

	// Method to open tool
	open() {
		this.isOpen = true;
	}

	// Method to close tool
	close() {
		this.isOpen = false;
	}
}

let TOOL_CONTEXT_KEY = Symbol("tool");

export function setToolContext(toolInstance: ToolClass) {
	return setContext(TOOL_CONTEXT_KEY, toolInstance);
}

export function getToolContext(): ToolClass {
	let context = getContext<ToolClass>(TOOL_CONTEXT_KEY);
	if (!context) {
		throw new Error("Tool components must be used within a Tool context provider");
	}
	return context;
}
