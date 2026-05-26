import Message from "./core/message.svelte";
import MessageContent from "./core/message-content.svelte";
import MessageActions from "./actions/message-actions.svelte";
import MessageAction from "./actions/message-action.svelte";
import MessageToolbar from "./actions/message-toolbar.svelte";
import MessageBranch from "./branching/message-branch.svelte";
import MessageBranchContent from "./branching/message-branch-content.svelte";
import MessageBranchSelector from "./branching/message-branch-selector.svelte";
import MessageBranchPrevious from "./branching/message-branch-previous.svelte";
import MessageBranchNext from "./branching/message-branch-next.svelte";
import MessageBranchPage from "./branching/message-branch-page.svelte";
import MessageResponse from "./response/message-response.svelte";
import MessageAttachment from "./attachments/message-attachment.svelte";
import MessageAttachmentPreview from "./attachments/message-attachment-preview.svelte";
import MessageAttachments from "./attachments/message-attachments.svelte";

export * from "./context/message-context.svelte.js";

export {
	Message,
	MessageContent,
	MessageActions,
	MessageAction,
	MessageToolbar,
	MessageBranch,
	MessageBranchContent,
	MessageBranchSelector,
	MessageBranchPrevious,
	MessageBranchNext,
	MessageBranchPage,
	MessageResponse,
	MessageAttachment,
	MessageAttachmentPreview,
	MessageAttachments,

	// Aliases
	Message as Root,
	MessageContent as Content,
	MessageActions as Actions,
	MessageAction as Action,
	MessageToolbar as Toolbar,
	MessageBranch as Branch,
	MessageBranchContent as BranchContent,
	MessageBranchSelector as BranchSelector,
	MessageBranchPrevious as BranchPrevious,
	MessageBranchNext as BranchNext,
	MessageBranchPage as BranchPage,
	MessageResponse as Response,
	MessageAttachment as Attachment,
	MessageAttachmentPreview as AttachmentPreview,
	MessageAttachments as Attachments,
};
