import { getContext, setContext } from "svelte";

const REASONING_CONTEXT_KEY = Symbol("reasoning-context");

export class ReasoningContext {
	#isStreaming = $state(false);
	#isOpen = $state(true);
	#duration = $state(0);

	constructor(
		options: {
			isStreaming?: boolean;
			isOpen?: boolean;
			duration?: number;
		} = {}
	) {
		this.#isStreaming = options.isStreaming ?? false;
		this.#isOpen = options.isOpen ?? true;
		this.#duration = options.duration ?? 0;
	}

	get isStreaming() {
		return this.#isStreaming;
	}

	set isStreaming(value: boolean) {
		this.#isStreaming = value;
	}

	get isOpen() {
		return this.#isOpen;
	}

	set isOpen(value: boolean) {
		this.#isOpen = value;
	}

	get duration() {
		return this.#duration;
	}

	set duration(value: number) {
		this.#duration = value;
	}

	setIsOpen(open: boolean) {
		this.#isOpen = open;
	}
}

export function setReasoningContext(context: ReasoningContext) {
	setContext(REASONING_CONTEXT_KEY, context);
}

export function getReasoningContext(): ReasoningContext {
	let context = getContext<ReasoningContext | undefined>(REASONING_CONTEXT_KEY);
	if (!context) {
		throw new Error("Reasoning components must be used within Reasoning");
	}
	return context;
}
