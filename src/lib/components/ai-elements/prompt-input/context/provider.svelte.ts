import { getContext, setContext } from "svelte";
import { AttachmentsContext } from "./attachments.svelte.js";

export class TextController {
	value = $state("");

	setInput = (newValue: string) => {
		this.value = newValue;
	};

	clear = () => {
		this.value = "";
	};
}

export class Controller {
	textInput: TextController;
	attachments: AttachmentsContext;

	constructor(initialInput = "", accept?: string, multiple?: boolean) {
		this.textInput = new TextController();
		this.textInput.value = initialInput;
		this.attachments = new AttachmentsContext({ accept, multiple });
	}
}

const PROVIDER_CONTEXT_KEY = Symbol("prompt-input-provider");

export function setPromptInputProvider(controller: Controller) {
	setContext(PROVIDER_CONTEXT_KEY, controller);
}

export function getPromptInputProvider(): Controller | null {
	return getContext<Controller>(PROVIDER_CONTEXT_KEY) || null;
}

export function usePromptInput(): Controller {
	let context = getContext<Controller>(PROVIDER_CONTEXT_KEY);
	if (!context) {
		throw new Error("usePromptInput must be used within a PromptInputProvider");
	}
	return context;
}

export { Controller as PromptInputController, TextController as TextInputController };
