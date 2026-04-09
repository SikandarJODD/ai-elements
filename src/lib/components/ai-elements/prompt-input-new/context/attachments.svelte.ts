import { getContext, setContext } from "svelte";
import type { PromptInputAttachment } from "./types.js";

export type AttachmentError = {
	code: "max_files" | "max_file_size" | "accept";
	message: string;
};

type AttachmentCallbacks = {
	onAttachmentsChange?: (attachments: PromptInputAttachment[]) => void;
	onFileAdd?: (added: PromptInputAttachment[], attachments: PromptInputAttachment[]) => void;
	onFileRemove?: (removed: PromptInputAttachment[], attachments: PromptInputAttachment[]) => void;
};

type AttachmentOptions = {
	accept?: string;
	multiple?: boolean;
	maxFiles?: number;
	maxFileSize?: number;
	onError?: (err: AttachmentError) => void;
	onFileAdd?: AttachmentCallbacks["onFileAdd"];
	onFileRemove?: AttachmentCallbacks["onFileRemove"];
};

export class AttachmentsContext {
	attachments = $state<PromptInputAttachment[]>([]);
	fileInputRef = $state<HTMLInputElement | null>(null);

	accept?: string;
	multiple?: boolean;
	maxFiles?: number;
	maxFileSize?: number;
	onError?: (err: AttachmentError) => void;
	onAttachmentsChange?: (attachments: PromptInputAttachment[]) => void;
	onFileAdd?: (added: PromptInputAttachment[], attachments: PromptInputAttachment[]) => void;
	onFileRemove?: (removed: PromptInputAttachment[], attachments: PromptInputAttachment[]) => void;

	constructor(options: AttachmentOptions = {}) {
		this.configure(options);
	}

	configure = (options: AttachmentOptions = {}) => {
		this.accept = options.accept;
		this.multiple = options.multiple;
		this.maxFiles = options.maxFiles;
		this.maxFileSize = options.maxFileSize;
		this.onError = options.onError;
		this.onFileAdd = options.onFileAdd;
		this.onFileRemove = options.onFileRemove;
	};

	openFileDialog = () => {
		this.fileInputRef?.click();
	};

	private cleanupPreviewUrls = (
		previous: PromptInputAttachment[],
		next: PromptInputAttachment[]
	) => {
		let nextUrls = new Set(
			next
				.map((attachment) => attachment.previewUrl)
				.filter((url): url is string => Boolean(url))
		);

		for (let attachment of previous) {
			let previewUrl = attachment.previewUrl;
			if (previewUrl?.startsWith("blob:") && !nextUrls.has(previewUrl)) {
				URL.revokeObjectURL(previewUrl);
			}
		}
	};

	private setAttachments = (next: PromptInputAttachment[]) => {
		if (this.attachments === next) {
			return;
		}

		this.cleanupPreviewUrls(this.attachments, next);
		this.attachments = next;
		this.onAttachmentsChange?.(next);
	};

	replace = (attachments: PromptInputAttachment[] | undefined) => {
		this.setAttachments(attachments ?? []);
	};

	matchesAccept = (file: File): boolean => {
		if (!this.accept || this.accept.trim() === "") {
			return true;
		}

		let patterns = this.accept
			.split(",")
			.map((pattern) => pattern.trim())
			.filter(Boolean);

		return patterns.some((pattern) => {
			if (pattern.endsWith("/*")) {
				return file.type.startsWith(pattern.slice(0, -1));
			}

			return file.type === pattern;
		});
	};

	add = (files: File[] | FileList) => {
		let incoming = Array.from(files);
		let accepted = incoming.filter((f) => this.matchesAccept(f));

		if (accepted.length === 0) {
			this.onError?.({
				code: "accept",
				message: "No files match the accepted types.",
			});
			return;
		}

		let withinSize = (f: File) => (this.maxFileSize ? f.size <= this.maxFileSize : true);
		let sized = accepted.filter(withinSize);

		if (sized.length === 0 && accepted.length > 0) {
			this.onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size.",
			});
			return;
		}

		let effectiveMaxFiles =
			this.multiple === false
				? typeof this.maxFiles === "number"
					? Math.min(this.maxFiles, 1)
					: 1
				: this.maxFiles;

		let capacity =
			typeof effectiveMaxFiles === "number"
				? Math.max(0, effectiveMaxFiles - this.attachments.length)
				: undefined;
		let capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;

		if (typeof capacity === "number" && sized.length > capacity) {
			this.onError?.({
				code: "max_files",
				message: "Too many files. Some were not added.",
			});
		}

		let added: PromptInputAttachment[] = [];
		for (let file of capped) {
			added.push({
				id: crypto.randomUUID(),
				file,
				previewUrl: URL.createObjectURL(file),
				mediaType: file.type,
				filename: file.name,
			});
		}

		if (added.length === 0) {
			return [];
		}

		let next = [...this.attachments, ...added];
		this.setAttachments(next);
		this.onFileAdd?.(added, next);

		return added;
	};

	remove = (id: string) => {
		let removed = this.attachments.filter((attachment) => attachment.id === id);
		if (removed.length === 0) {
			return [];
		}

		let next = this.attachments.filter((attachment) => attachment.id !== id);
		this.setAttachments(next);
		this.onFileRemove?.(removed, next);

		return removed;
	};

	clear = () => {
		let removed = this.attachments;
		if (removed.length === 0) {
			return [];
		}

		this.setAttachments([]);
		this.onFileRemove?.(removed, []);

		return removed;
	};

	destroy = () => {
		this.cleanupPreviewUrls(this.attachments, []);
		this.attachments = [];
		this.fileInputRef = null;
	};
}

const ATTACHMENTS_CONTEXT_KEY = Symbol("attachments");

export function setAttachmentsContext(context: AttachmentsContext) {
	setContext(ATTACHMENTS_CONTEXT_KEY, context);
}

export function getAttachmentsContext(): AttachmentsContext {
	let context = getContext<AttachmentsContext>(ATTACHMENTS_CONTEXT_KEY);
	if (!context) {
		throw new Error("usePromptInputAttachments must be used within a PromptInput");
	}
	return context;
}
