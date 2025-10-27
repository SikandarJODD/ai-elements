import { getContext } from "svelte";

class ReasoningContext {
	private _isOpen = $state(false);
	private _onOpenChange?: (open: boolean) => void;
	private _isControlled = false;
	wasAutoOpened = $state(false);

	constructor(open?: boolean, onOpenChange?: (open: boolean) => void, isStreaming?: boolean) {
		this._isControlled = open !== undefined;
		this._isOpen = open ?? false;
		this._onOpenChange = onOpenChange;
	}

	get isOpen() {
		return this._isOpen;
	}

	setOpen(newOpen: boolean) {
		if (!this._isControlled) {
			this._isOpen = newOpen;
		}
		this._onOpenChange?.(newOpen);
	}

	toggle() {
		this.setOpen(!this._isOpen);
	}
}

export function createReasoningContext(
	open?: boolean,
	onOpenChange?: (open: boolean) => void,
	isStreaming?: boolean
) {
	return new ReasoningContext(open, onOpenChange, isStreaming);
}

export function getReasoningContext(): ReasoningContext {
	const context = getContext<ReasoningContext>("reasoning");
	if (!context) {
		throw new Error("getReasoningContext must be used within a Reasoning component");
	}
	return context;
}
