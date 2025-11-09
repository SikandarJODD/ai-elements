import { getContext, setContext } from "svelte";

const CONFIRMATION_CONTEXT_KEY = Symbol("confirmation-context");

export type ToolUIPartApproval =
	| {
			id: string;
			approved?: never;
			reason?: never;
	  }
	| {
			id: string;
			approved: boolean;
			reason?: string;
	  }
	| {
			id: string;
			approved: true;
			reason?: string;
	  }
	| {
			id: string;
			approved: false;
			reason?: string;
	  }
	| undefined;

export type ToolUIPartState =
	| "input-streaming"
	| "input-available"
	| "approval-requested"
	| "approval-responded"
	| "output-denied"
	| "output-available";

export type ConfirmationContextValue = {
	approval: ToolUIPartApproval;
	state: ToolUIPartState;
};

export function setConfirmationContext(value: ConfirmationContextValue) {
	setContext(CONFIRMATION_CONTEXT_KEY, value);
}

export function getConfirmationContext(): ConfirmationContextValue {
	const context = getContext<ConfirmationContextValue>(CONFIRMATION_CONTEXT_KEY);
	if (!context) {
		throw new Error("Confirmation components must be used within Confirmation");
	}
	return context;
}
