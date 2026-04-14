import Message from "./core/Message.svelte";
import MessageContent from "./core/MessageContent.svelte";
import MessageActions from "./actions/MessageActions.svelte";
import MessageAction from "./actions/MessageAction.svelte";
import MessageToolbar from "./actions/MessageToolbar.svelte";
import MessageBranch from "./branching/MessageBranch.svelte";
import MessageBranchContent from "./branching/MessageBranchContent.svelte";
import MessageBranchSelector from "./branching/MessageBranchSelector.svelte";
import MessageBranchPrevious from "./branching/MessageBranchPrevious.svelte";
import MessageBranchNext from "./branching/MessageBranchNext.svelte";
import MessageBranchPage from "./branching/MessageBranchPage.svelte";
import MessageResponse from "./response/MessageResponse.svelte";
import MessageAttachment from "./attachments/MessageAttachment.svelte";
import MessageAttachmentPreview from "./attachments/MessageAttachmentPreview.svelte";
import MessageAttachments from "./attachments/MessageAttachments.svelte";

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
