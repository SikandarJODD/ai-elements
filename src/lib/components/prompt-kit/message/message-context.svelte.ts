import { getContext, setContext } from "svelte";

export type MessageSchema = {
	// Add any shared state if needed in the future
};

export class MessageClass {
	// Placeholder for shared state management
	// Currently the Message component is mostly presentational
	// but this allows for future extensibility

	constructor(props?: MessageSchema) {
		// Initialize any shared state here if needed
	}
}

const MESSAGE_KEY = Symbol("message");

export function setMessageContext(contextInstance: MessageClass) {
	setContext(MESSAGE_KEY, contextInstance);
}

export function getMessageContext(): MessageClass {
	const context = getContext<MessageClass>(MESSAGE_KEY);

	if (!context) {
		throw new Error("Message subcomponents must be used within Message");
	}

	return context;
}
