export interface FileUIPart {
	type: "file";
	url?: string;
	mediaType?: string;
	filename?: string;
}

export interface FileWithId extends FileUIPart {
	id: string;
}

export interface Message {
	text?: string;
	files?: FileUIPart[];
}

export type ChatStatus = "submitted" | "streaming" | "error" | "idle";

export type PromptInputMessage = Message;
