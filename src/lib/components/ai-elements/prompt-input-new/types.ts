import type { HTMLAttributes, FormEventHandler } from "svelte/elements";

// Re-export types from context
export type {
	FileUIPart,
	FileWithId,
	PromptInputMessage,
	ChatStatus,
	AttachmentsController,
	TextInputController,
	PromptInputController,
} from "./prompt-input-context.svelte.js";

// ============================================================================
// Component Props Types
// ============================================================================

export interface PromptInputProps extends Omit<HTMLAttributes<HTMLFormElement>, "onsubmit"> {
	accept?: string; // e.g., "image/*" or leave undefined for any
	multiple?: boolean;
	// When true, accepts drops anywhere on document. Default false (opt-in).
	globalDrop?: boolean;
	// Render a hidden input with given name and keep it in sync for native form posts. Default false.
	syncHiddenInput?: boolean;
	// Minimal constraints
	maxFiles?: number;
	maxFileSize?: number; // bytes
	onError?: (err: { code: "max_files" | "max_file_size" | "accept"; message: string }) => void;
	onSubmit: (
		message: import("./prompt-input-context.svelte.js").PromptInputMessage,
		event: SubmitEvent
	) => void | Promise<void>;
	children?: import("svelte").Snippet;
}

export interface PromptInputProviderProps {
	initialInput?: string;
	accept?: string;
	multiple?: boolean;
	maxFiles?: number;
	maxFileSize?: number;
	onError?: (err: { code: "max_files" | "max_file_size" | "accept"; message: string }) => void;
	children?: import("svelte").Snippet;
}

export interface PromptInputBodyProps extends HTMLAttributes<HTMLDivElement> {
	children?: import("svelte").Snippet;
}

export interface PromptInputHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children?: import("svelte").Snippet;
}

export interface PromptInputFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: import("svelte").Snippet;
}

export interface PromptInputTextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
	placeholder?: string;
	value?: string;
	ref?: HTMLTextAreaElement | null;
}

export interface PromptInputToolsProps extends HTMLAttributes<HTMLDivElement> {
	children?: import("svelte").Snippet;
}

export interface PromptInputButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "icon-sm";
	children?: import("svelte").Snippet;
}

export interface PromptInputAttachmentsProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	children?: import("svelte").Snippet<[import("./prompt-input-context.svelte.js").FileWithId]>;
}

export interface PromptInputAttachmentProps extends HTMLAttributes<HTMLDivElement> {
	data: import("./prompt-input-context.svelte.js").FileWithId;
}

export interface PromptInputSubmitProps extends HTMLAttributes<HTMLButtonElement> {
	status?: import("./prompt-input-context.svelte.js").ChatStatus;
}

export interface PromptInputSpeechButtonProps extends HTMLAttributes<HTMLButtonElement> {
	textareaRef?: HTMLTextAreaElement | null;
}
