import type {
	PromptInputAttachment,
	PromptInputError,
	PromptInputFilesAddPayload,
	PromptInputFilesAddSource,
	PromptInputFilesRemovePayload,
	PromptInputFilesRemoveSource,
	PromptInputMessage,
	PromptInputSource,
	PromptInputValidationOptions,
} from "./types.js";
import {
	attachmentToSubmitAttachment,
	createAttachmentFromFile,
	createPromptInputId,
	fileListToArray,
	getEffectiveMaxFiles,
	matchesAccept,
	revokeObjectUrl,
	sameAttachment,
	sameAttachmentList,
} from "./utils.js";

export class TextInputController {
	value = $state("");

	constructor(initialValue = "") {
		this.value = initialValue;
	}

	setInput(value: string) {
		this.value = value;
	}

	clear() {
		this.value = "";
	}
}

export class AttachmentStoreController {
	files = $state<PromptInputAttachment[]>([]);
	fileInput: HTMLInputElement | null = null;
	#openDialog: (() => void) | null = null;

	addAttachments(files: PromptInputAttachment[]) {
		if (files.length === 0) {
			return [];
		}

		this.files = [...this.files, ...files];
		return files;
	}

	addFiles(files: File[]) {
		if (files.length === 0) {
			return [];
		}

		return this.addAttachments(files.map((file) => createAttachmentFromFile(file)));
	}

	registerFileInput(node: HTMLInputElement | null, open?: () => void) {
		this.fileInput = node;
		this.#openDialog = open ?? (() => node?.click());
	}

	openFileDialog() {
		this.#openDialog?.();
	}

	removeByIds(ids: string[]) {
		if (ids.length === 0) {
			return [];
		}

		const idSet = new Set(ids);
		const removed = this.files.filter((file) => idSet.has(file.id));

		if (removed.length === 0) {
			return [];
		}

		for (const file of removed) {
			revokeObjectUrl(file.url);
		}

		this.files = this.files.filter((file) => !idSet.has(file.id));

		if (this.files.length === 0 && this.fileInput) {
			this.fileInput.value = "";
		}

		return removed;
	}

	replaceFiles(nextFiles: PromptInputAttachment[]) {
		if (sameAttachmentList(this.files, nextFiles)) {
			return {
				added: [] as PromptInputAttachment[],
				removed: [] as PromptInputAttachment[],
			};
		}

		const previousFiles = this.files;
		const nextFilesById = new Map(nextFiles.map((file) => [file.id, file]));
		const previousFilesById = new Map(previousFiles.map((file) => [file.id, file]));

		const removed = previousFiles.filter((file) => {
			const replacement = nextFilesById.get(file.id);
			return !replacement || !sameAttachment(file, replacement);
		});

		const added = nextFiles.filter((file) => {
			const previous = previousFilesById.get(file.id);
			return !previous || !sameAttachment(previous, file);
		});

		for (const file of removed) {
			revokeObjectUrl(file.url);
		}

		this.files = [...nextFiles];

		if (this.files.length === 0 && this.fileInput) {
			this.fileInput.value = "";
		}

		return {
			added,
			removed,
		};
	}

	clear() {
		const removed = [...this.files];

		for (const file of removed) {
			revokeObjectUrl(file.url);
		}

		this.files = [];

		if (this.fileInput) {
			this.fileInput.value = "";
		}

		return removed;
	}

	destroy() {
		this.clear();
	}
}

interface ValidatedAttachmentsCallbacks {
	onAdd?: (payload: PromptInputFilesAddPayload) => void;
	onRemove?: (payload: PromptInputFilesRemovePayload) => void;
}

export class ValidatedAttachmentsController {
	#options: PromptInputValidationOptions;
	#store: AttachmentStoreController;
	#callbacks: ValidatedAttachmentsCallbacks = {};

	constructor(store: AttachmentStoreController, options: PromptInputValidationOptions = {}) {
		this.#store = store;
		this.#options = options;
	}

	get files() {
		return this.#store.files;
	}

	setOptions(options: PromptInputValidationOptions) {
		this.#options = options;
	}

	setCallbacks(callbacks: ValidatedAttachmentsCallbacks) {
		this.#callbacks = callbacks;
	}

	registerFileInput(node: HTMLInputElement | null, open?: () => void) {
		this.#store.registerFileInput(node, open);
	}

	openFileDialog() {
		this.#store.openFileDialog();
	}

	add(input: File[] | FileList, source: PromptInputFilesAddSource = "picker") {
		const incoming = fileListToArray(input);
		if (incoming.length === 0) {
			return;
		}

		const accepted = incoming.filter((file) => matchesAccept(file, this.#options.accept));
		if (incoming.length > 0 && accepted.length === 0) {
			this.#emitError({
				code: "accept",
				message: "No files match the accepted types.",
			});
			return;
		}

		const sized = accepted.filter((file) =>
			typeof this.#options.maxFileSize === "number" ? file.size <= this.#options.maxFileSize : true,
		);

		if (accepted.length > 0 && sized.length === 0) {
			this.#emitError({
				code: "max_file_size",
				message: "All files exceed the maximum size.",
			});
			return;
		}

		const effectiveMaxFiles = getEffectiveMaxFiles(this.#options);
		const capacity =
			typeof effectiveMaxFiles === "number"
				? Math.max(0, effectiveMaxFiles - this.files.length)
				: undefined;

		const nextFiles = typeof capacity === "number" ? sized.slice(0, capacity) : sized;

		if (typeof capacity === "number" && sized.length > capacity) {
			this.#emitError({
				code: "max_files",
				message: "Too many files. Some were not added.",
			});
		}

		const addedFiles = this.#store.addFiles(nextFiles);

		if (addedFiles.length > 0) {
			this.#callbacks.onAdd?.({
				allFiles: [...this.files],
				files: [...addedFiles],
				source,
			});
		}
	}

	remove(id: string, source: PromptInputFilesRemoveSource = "remove") {
		const removedFiles = this.#store.removeByIds([id]);

		if (removedFiles.length > 0) {
			this.#callbacks.onRemove?.({
				allFiles: [...this.files],
				files: [...removedFiles],
				source,
			});
		}
	}

	clear(source: PromptInputFilesRemoveSource = "submit-clear") {
		const removedFiles = this.#store.clear();

		if (removedFiles.length > 0) {
			this.#callbacks.onRemove?.({
				allFiles: [...this.files],
				files: [...removedFiles],
				source,
			});
		}
	}

	replaceFiles(files: PromptInputAttachment[]) {
		this.#store.replaceFiles(files);
	}

	#emitError(error: PromptInputError) {
		this.#options.onError?.(error);
	}
}

export class ReferencedSourcesController {
	sources = $state<PromptInputSource[]>([]);

	add(source: PromptInputSource | PromptInputSource[]) {
		const next = Array.isArray(source) ? source : [source];
		if (next.length === 0) {
			return;
		}

		this.sources = [
			...this.sources,
			...next.map((item) => ({
				...item,
				id: item.id || createPromptInputId("source"),
			})),
		];
	}

	remove(id: string) {
		this.sources = this.sources.filter((source) => source.id !== id);
	}

	clear() {
		this.sources = [];
	}
}

export class PromptInputProviderController {
	textInput: TextInputController;
	attachmentsStore: AttachmentStoreController;

	constructor(initialInput = "") {
		this.textInput = new TextInputController(initialInput);
		this.attachmentsStore = new AttachmentStoreController();
	}

	registerFileInput(node: HTMLInputElement | null, open?: () => void) {
		this.attachmentsStore.registerFileInput(node, open);
	}

	destroy() {
		this.attachmentsStore.destroy();
	}
}

interface PromptInputRootControllerOptions {
	initialInput?: string;
	providerController?: PromptInputProviderController | null;
	validation?: PromptInputValidationOptions;
}

export class PromptInputRootController {
	textInput: TextInputController;
	attachmentsStore: AttachmentStoreController;
	attachments: ValidatedAttachmentsController;
	referencedSources = new ReferencedSourcesController();
	#providerBacked: boolean;

	constructor(options: PromptInputRootControllerOptions = {}) {
		this.#providerBacked = Boolean(options.providerController);
		this.textInput =
			options.providerController?.textInput ?? new TextInputController(options.initialInput ?? "");
		this.attachmentsStore =
			options.providerController?.attachmentsStore ?? new AttachmentStoreController();
		this.attachments = new ValidatedAttachmentsController(
			this.attachmentsStore,
			options.validation,
		);
	}

	setValidationOptions(options: PromptInputValidationOptions) {
		this.attachments.setOptions(options);
	}

	registerFileInput(node: HTMLInputElement | null, open?: () => void) {
		this.attachments.registerFileInput(node, open);
	}

	clear(source: PromptInputFilesRemoveSource = "submit-clear") {
		this.attachments.clear(source);
		this.referencedSources.clear();
		this.textInput.clear();
	}

	clearTransientState(source: PromptInputFilesRemoveSource = "submit-clear") {
		this.attachments.clear(source);
		this.referencedSources.clear();
	}

	async createMessage(): Promise<PromptInputMessage> {
		return {
			files: await Promise.all(this.attachments.files.map((file) => attachmentToSubmitAttachment(file))),
			sources: this.referencedSources.sources.map((source) => ({ ...source })),
			text: this.textInput.value,
		};
	}

	destroy() {
		this.referencedSources.clear();

		if (!this.#providerBacked) {
			this.attachmentsStore.destroy();
		}
	}
}
