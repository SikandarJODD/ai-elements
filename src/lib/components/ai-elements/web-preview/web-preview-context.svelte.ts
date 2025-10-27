import { getContext, setContext } from "svelte";

const WEB_PREVIEW_CONTEXT_KEY = Symbol("web-preview");

export type LogLevel = "log" | "warn" | "error";

export type LogEntry = {
	level: LogLevel;
	message: string;
	timestamp: Date;
};

export class WebPreviewContext {
	#url = $state("");
	#consoleOpen = $state(false);
	#onUrlChange?: (url: string) => void;

	constructor(defaultUrl: string = "", onUrlChange?: (url: string) => void) {
		this.#url = defaultUrl;
		this.#onUrlChange = onUrlChange;
	}

	get url() {
		return this.#url;
	}

	setUrl(newUrl: string) {
		this.#url = newUrl;
		this.#onUrlChange?.(newUrl);
	}

	get consoleOpen() {
		return this.#consoleOpen;
	}

	setConsoleOpen(open: boolean) {
		this.#consoleOpen = open;
	}
}

export function setWebPreviewContext(context: WebPreviewContext) {
	return setContext(WEB_PREVIEW_CONTEXT_KEY, context);
}

export function getWebPreviewContext(): WebPreviewContext {
	let context = getContext<WebPreviewContext>(WEB_PREVIEW_CONTEXT_KEY);
	if (!context) {
		throw new Error("WebPreview components must be used within a WebPreview");
	}
	return context;
}
