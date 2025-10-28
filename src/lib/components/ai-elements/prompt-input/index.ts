// Main component
export { default as PromptInput } from "./PromptInput.svelte";
export { default as PromptInputProvider } from "./PromptInputProvider.svelte";

// Form components
export { default as PromptInputBody } from "./PromptInputBody.svelte";
export { default as PromptInputTextarea } from "./PromptInputTextarea.svelte";
export { default as PromptInputToolbar } from "./PromptInputToolbar.svelte";
export { default as PromptInputTools } from "./PromptInputTools.svelte";
export { default as PromptInputButton } from "./PromptInputButton.svelte";

// Attachment components
export { default as PromptInputAttachment } from "./PromptInputAttachment.svelte";
export { default as PromptInputAttachments } from "./PromptInputAttachments.svelte";

// Action menu components
export { default as PromptInputActionMenu } from "./PromptInputActionMenu.svelte";
export { default as PromptInputActionMenuTrigger } from "./PromptInputActionMenuTrigger.svelte";
export { default as PromptInputActionMenuContent } from "./PromptInputActionMenuContent.svelte";
export { default as PromptInputActionMenuItem } from "./PromptInputActionMenuItem.svelte";
export { default as PromptInputActionAddAttachments } from "./PromptInputActionAddAttachments.svelte";

// Submit component
export { default as PromptInputSubmit } from "./PromptInputSubmit.svelte";

// Model select components
export { default as PromptInputModelSelect } from "./PromptInputModelSelect.svelte";
export { default as PromptInputModelSelectTrigger } from "./PromptInputModelSelectTrigger.svelte";
export { default as PromptInputModelSelectContent } from "./PromptInputModelSelectContent.svelte";
export { default as PromptInputModelSelectItem } from "./PromptInputModelSelectItem.svelte";
export { default as PromptInputModelSelectValue } from "./PromptInputModelSelectValue.svelte";

// Icon components
export { default as ImageIcon } from "./ImageIcon.svelte";
export { default as Loader2Icon } from "./Loader2Icon.svelte";
export { default as PaperclipIcon } from "./PaperclipIcon.svelte";
export { default as PlusIcon } from "./PlusIcon.svelte";
export { default as SendIcon } from "./SendIcon.svelte";
export { default as SquareIcon } from "./SquareIcon.svelte";
export { default as XIcon } from "./XIcon.svelte";
export { default as GlobeIcon } from "./GlobeIcon.svelte";
export { default as MicIcon } from "./MicIcon.svelte";

// Context and types
export {
	AttachmentsContext,
	getAttachmentsContext,
	setAttachmentsContext,
	PromptInputController,
	TextInputController,
	getPromptInputProvider,
	getPromptInputController,
	setPromptInputProvider,
	type FileUIPart,
	type FileWithId,
	type PromptInputMessage,
	type ChatStatus,
} from "./attachments-context.svelte.js";
