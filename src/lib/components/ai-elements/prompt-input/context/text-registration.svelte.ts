import { getContext, setContext } from "svelte";

export type PromptInputTextHandle = {
	getValue: () => string;
	clear: () => void;
};

type PromptInputTextRegistration = {
	register: (handle: PromptInputTextHandle) => void;
	unregister: (handle: PromptInputTextHandle) => void;
};

const PROMPT_INPUT_TEXT_REGISTRATION_KEY = Symbol("prompt-input-text-registration");

export function setPromptInputTextRegistration(registration: PromptInputTextRegistration) {
	setContext(PROMPT_INPUT_TEXT_REGISTRATION_KEY, registration);
}

export function getPromptInputTextRegistration(): PromptInputTextRegistration {
	let context = getContext<PromptInputTextRegistration>(PROMPT_INPUT_TEXT_REGISTRATION_KEY);
	if (!context) {
		throw new Error("PromptInput.Textarea must be used within PromptInput.Root");
	}
	return context;
}
