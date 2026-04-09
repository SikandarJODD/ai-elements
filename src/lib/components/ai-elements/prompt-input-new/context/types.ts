import type { FileUIPart } from "ai";

export type PromptInputUploadStatus = "uploading" | "uploaded" | "error";

export interface PromptInputAttachment {
	id: string;
	file: File;
	filename: string;
	mediaType: string;
	previewUrl?: string;
	remoteUrl?: string;
	uploadStatus?: PromptInputUploadStatus;
	error?: string;
}

export type FileWithId = PromptInputAttachment;

export interface Message {
	text: string;
	files?: FileUIPart[];
	attachments: PromptInputAttachment[];
}

export type ChatStatus = "submitted" | "streaming" | "error" | "ready";

export type PromptInputMessage = Message;
