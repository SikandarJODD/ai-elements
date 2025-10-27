import { getContext, setContext } from "svelte";

export type PromptInputSchema = {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
	maxHeight?: number | string;
	onSubmit?: () => void;
	disabled?: boolean;
};

export class PromptInputClass {
	isLoading = $state(false);
	value = $state("");
	maxHeight = $state<number | string>(240);
	onSubmit = $state<(() => void) | undefined>(undefined);
	disabled = $state(false);
	textareaRef = $state<HTMLTextAreaElement | null>(null);
	onValueChange = $state<((value: string) => void) | undefined>(undefined);

	constructor(props: PromptInputSchema) {
		this.isLoading = props.isLoading ?? false;
		this.value = props.value ?? "";
		this.maxHeight = props.maxHeight ?? 240;
		this.onSubmit = props.onSubmit;
		this.disabled = props.disabled ?? false;
		this.onValueChange = props.onValueChange;
	}

	setValue(newValue: string) {
		this.value = newValue;
		this.onValueChange?.(newValue);
	}
}

const PROMPT_INPUT_KEY = Symbol("prompt-input");

export function setPromptInputContext(contextInstance: PromptInputClass) {
	setContext(PROMPT_INPUT_KEY, contextInstance);
}

export function getPromptInputContext(): PromptInputClass {
	const context = getContext<PromptInputClass>(PROMPT_INPUT_KEY);

	if (!context) {
		throw new Error("PromptInput components must be used within PromptInput");
	}

	return context;
}
