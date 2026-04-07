export type PromptInputStatus = "ready" | "submitted" | "streaming" | "error";

export type PromptInputErrorCode = "max_files" | "max_file_size" | "accept";

export interface PromptInputError {
	code: PromptInputErrorCode;
	message: string;
}

export interface PromptInputAttachment {
	id: string;
	type: "file";
	filename: string;
	mediaType: string;
	url: string;
	file?: File;
}

export type PromptInputSubmitAttachment = Omit<PromptInputAttachment, "file">;

export type PromptInputFilesAddSource = "picker" | "paste" | "drop" | "screenshot";

export type PromptInputFilesRemoveSource = "remove" | "backspace" | "submit-clear";

export interface PromptInputFilesAddPayload {
	files: PromptInputAttachment[];
	allFiles: PromptInputAttachment[];
	source: PromptInputFilesAddSource;
}

export interface PromptInputFilesRemovePayload {
	files: PromptInputAttachment[];
	allFiles: PromptInputAttachment[];
	source: PromptInputFilesRemoveSource;
}

export interface PromptInputSource {
	id: string;
	title: string;
	url?: string;
	snippet?: string;
	metadata?: Record<string, string>;
}

export interface PromptInputMessage {
	text: string;
	files: PromptInputSubmitAttachment[];
	sources: PromptInputSource[];
}

export interface PromptInputValidationOptions {
	accept?: string;
	maxFiles?: number;
	maxFileSize?: number;
	multiple?: boolean;
	onError?: (error: PromptInputError) => void;
}
