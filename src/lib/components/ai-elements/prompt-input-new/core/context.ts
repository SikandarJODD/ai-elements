import { getContext, hasContext, setContext } from "svelte";
import type {
	PromptInputProviderController,
	PromptInputRootController,
	ReferencedSourcesController,
	ValidatedAttachmentsController,
} from "./controllers.svelte.js";

const promptInputProviderControllerKey = Symbol("prompt-input-provider-controller");
const promptInputRootControllerKey = Symbol("prompt-input-root-controller");
const promptInputAttachmentsKey = Symbol("prompt-input-attachments");
const promptInputReferencedSourcesKey = Symbol("prompt-input-referenced-sources");

function missingContext(message: string): never {
	throw new Error(message);
}

export function setProviderController(controller: PromptInputProviderController) {
	setContext(promptInputProviderControllerKey, controller);
	return controller;
}

export function getOptionalProviderController() {
	return hasContext(promptInputProviderControllerKey)
		? getContext<PromptInputProviderController>(promptInputProviderControllerKey)
		: null;
}

export function setController(controller: PromptInputRootController) {
	setContext(promptInputRootControllerKey, controller);
	return controller;
}

export function getController() {
	return hasContext(promptInputRootControllerKey)
		? getContext<PromptInputRootController>(promptInputRootControllerKey)
		: missingContext("Prompt input context is missing. Wrap components inside <Root>.");
}

export function setAttachments(controller: ValidatedAttachmentsController) {
	setContext(promptInputAttachmentsKey, controller);
	return controller;
}

export function getAttachments() {
	return hasContext(promptInputAttachmentsKey)
		? getContext<ValidatedAttachmentsController>(promptInputAttachmentsKey)
		: missingContext("Prompt attachments context is missing. Use this component inside <Root>.");
}

export function setReferencedSources(controller: ReferencedSourcesController) {
	setContext(promptInputReferencedSourcesKey, controller);
	return controller;
}

export function getReferencedSources() {
	return hasContext(promptInputReferencedSourcesKey)
		? getContext<ReferencedSourcesController>(promptInputReferencedSourcesKey)
		: missingContext(
				"Prompt referenced sources context is missing. Use this component inside <Root>.",
			);
}
