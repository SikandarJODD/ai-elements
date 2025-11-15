import { setContext, getContext } from "svelte";

// ============================================================================
// Types
// ============================================================================

export interface FileUIPart {
	type: "file";
	url?: string;
	mediaType?: string;
	filename?: string;
}

export interface FileWithId extends FileUIPart {
	id: string;
}

export interface PromptInputMessage {
	text: string;
	files: FileUIPart[];
}

export type ChatStatus = "submitted" | "streaming" | "ready" | "error";

// ============================================================================
// Attachments Controller
// ============================================================================

export class AttachmentsController {
	files = $state<FileWithId[]>([]);
	fileInputRef = $state<HTMLInputElement | null>(null);

	constructor(
		private accept?: string,
		private multiple?: boolean,
		private maxFiles?: number,
		private maxFileSize?: number,
		private onError?: (err: {
			code: "max_files" | "max_file_size" | "accept";
			message: string;
		}) => void
	) {}

	openFileDialog = () => {
		this.fileInputRef?.click();
	};

	matchesAccept = (file: File): boolean => {
		if (!this.accept || this.accept.trim() === "") {
			return true;
		}
		if (this.accept.includes("image/*")) {
			return file.type.startsWith("image/");
		}
		// TODO: Expand for more MIME type patterns if needed
		return true;
	};

	add = (files: File[] | FileList) => {
		const incoming = Array.from(files);
		const accepted = incoming.filter((f) => this.matchesAccept(f));

		if (incoming.length && accepted.length === 0) {
			this.onError?.({
				code: "accept",
				message: "No files match the accepted types.",
			});
			return;
		}

		const withinSize = (f: File) => (this.maxFileSize ? f.size <= this.maxFileSize : true);
		const sized = accepted.filter(withinSize);

		if (accepted.length > 0 && sized.length === 0) {
			this.onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size.",
			});
			return;
		}

		const capacity =
			typeof this.maxFiles === "number"
				? Math.max(0, this.maxFiles - this.files.length)
				: undefined;
		const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;

		if (typeof capacity === "number" && sized.length > capacity) {
			this.onError?.({
				code: "max_files",
				message: "Too many files. Some were not added.",
			});
		}

		const next: FileWithId[] = [];
		for (const file of capped) {
			next.push({
				id: crypto.randomUUID(),
				type: "file",
				url: URL.createObjectURL(file),
				mediaType: file.type,
				filename: file.name,
			});
		}

		this.files = [...this.files, ...next];
	};

	remove = (id: string) => {
		const found = this.files.find((file) => file.id === id);
		if (found?.url) {
			URL.revokeObjectURL(found.url);
		}
		this.files = this.files.filter((file) => file.id !== id);
	};

	clear = () => {
		for (const file of this.files) {
			if (file.url) {
				URL.revokeObjectURL(file.url);
			}
		}
		this.files = [];
	};
}

// ============================================================================
// Text Input Controller
// ============================================================================

export class TextInputController {
	value = $state("");

	setInput = (newValue: string) => {
		this.value = newValue;
	};

	clear = () => {
		this.value = "";
	};
}

// ============================================================================
// Main Prompt Input Controller
// ============================================================================

export class PromptInputController {
	textInput: TextInputController;
	attachments: AttachmentsController;

	// INTERNAL: Allows PromptInput to register its file input + "open" callback
	// This is used by the provider to allow external components to trigger file dialog
	private _fileInputRef = $state<HTMLInputElement | null>(null);
	private _openFileDialog = $state<(() => void) | null>(null);

	constructor(
		initialInput = "",
		accept?: string,
		multiple?: boolean,
		maxFiles?: number,
		maxFileSize?: number,
		onError?: (err: { code: "max_files" | "max_file_size" | "accept"; message: string }) => void
	) {
		this.textInput = new TextInputController();
		this.textInput.value = initialInput;
		this.attachments = new AttachmentsController(
			accept,
			multiple,
			maxFiles,
			maxFileSize,
			onError
		);
	}

	// INTERNAL: Called by PromptInput to register its file input
	__registerFileInput = (ref: HTMLInputElement | null, open: () => void) => {
		this._fileInputRef = ref;
		this._openFileDialog = open;
		// Sync the ref to attachments controller
		this.attachments.fileInputRef = ref;
	};
}

// ============================================================================
// Context Keys
// ============================================================================

const PROMPT_INPUT_CONTROLLER_KEY = Symbol("prompt-input-controller");
const PROVIDER_ATTACHMENTS_KEY = Symbol("provider-attachments");
const LOCAL_ATTACHMENTS_KEY = Symbol("local-attachments");

// ============================================================================
// Provider Context (Optional - for external state management)
// ============================================================================

export function setPromptInputController(controller: PromptInputController) {
	setContext(PROMPT_INPUT_CONTROLLER_KEY, controller);
	// Also set provider attachments context for dual-mode support
	setContext(PROVIDER_ATTACHMENTS_KEY, controller.attachments);
}

export function getPromptInputController(): PromptInputController {
	const context = getContext<PromptInputController>(PROMPT_INPUT_CONTROLLER_KEY);
	if (!context) {
		throw new Error(
			"Wrap your component inside <PromptInputProvider> to use getPromptInputController()."
		);
	}
	return context;
}

export function getOptionalPromptInputController(): PromptInputController | null {
	return getContext<PromptInputController>(PROMPT_INPUT_CONTROLLER_KEY) || null;
}

// ============================================================================
// Attachments Context (Dual-mode: Provider or Local)
// ============================================================================

export function setLocalAttachmentsContext(context: AttachmentsController) {
	setContext(LOCAL_ATTACHMENTS_KEY, context);
}

export function getPromptInputAttachments(): AttachmentsController {
	// Dual-mode: prefer provider if present, otherwise use local
	const provider = getContext<AttachmentsController>(PROVIDER_ATTACHMENTS_KEY);
	const local = getContext<AttachmentsController>(LOCAL_ATTACHMENTS_KEY);
	const context = provider ?? local;

	if (!context) {
		throw new Error(
			"getPromptInputAttachments must be used within a PromptInput or PromptInputProvider"
		);
	}
	return context;
}

export function getProviderAttachments(): AttachmentsController {
	const context = getContext<AttachmentsController>(PROVIDER_ATTACHMENTS_KEY);
	if (!context) {
		throw new Error(
			"Wrap your component inside <PromptInputProvider> to use getProviderAttachments()."
		);
	}
	return context;
}

export function getOptionalProviderAttachments(): AttachmentsController | null {
	return getContext<AttachmentsController>(PROVIDER_ATTACHMENTS_KEY) || null;
}
