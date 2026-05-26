import Root from "./core/root.svelte";
import Provider from "./core/provider.svelte";
import Header from "./layout/header.svelte";
import Body from "./layout/body.svelte";
import Toolbar from "./layout/toolbar.svelte";
import Tools from "./layout/tools.svelte";
import Button from "./controls/button.svelte";
import Textarea from "./controls/textarea.svelte";
import Submit from "./controls/submit.svelte";
import Attachment from "./attachments/attachment.svelte";
import AttachmentImagePreview from "./attachments/attachment-image-preview.svelte";
import Attachments from "./attachments/attachments.svelte";
import ActionMenu from "./action-menu/action-menu.svelte";
import ActionMenuTrigger from "./action-menu/action-menu-trigger.svelte";
import ActionMenuContent from "./action-menu/action-menu-content.svelte";
import ActionMenuItem from "./action-menu/action-menu-item.svelte";
import ActionAddAttachments from "./action-menu/action-add-attachments.svelte";

export {
	Root,
	Provider,
	Header,
	Body,
	Toolbar,
	Tools,
	Button,
	Textarea,
	Submit,
	Attachment,
	AttachmentImagePreview,
	Attachments,
	ActionMenu,
	ActionMenuTrigger,
	ActionMenuContent,
	ActionMenuItem,
	ActionAddAttachments,
	//
	Root as PromptInput,
	Provider as PromptInputProvider,
	Header as PromptInputHeader,
	Body as PromptInputBody,
	Toolbar as PromptInputToolbar,
	Tools as PromptInputTools,
	Button as PromptInputButton,
	Textarea as PromptInputTextarea,
	Submit as PromptInputSubmit,
	Attachment as PromptInputAttachment,
	AttachmentImagePreview as PromptInputAttachmentImagePreview,
	Attachments as PromptInputAttachments,
	ActionMenu as PromptInputActionMenu,
	ActionMenuTrigger as PromptInputActionMenuTrigger,
	ActionMenuContent as PromptInputActionMenuContent,
	ActionMenuItem as PromptInputActionMenuItem,
	ActionAddAttachments as PromptInputActionAddAttachments,
};

export {
	AttachmentsContext,
	getAttachmentsContext,
	setAttachmentsContext,
} from "./context/attachments.svelte.js";

export {
	Controller,
	TextController,
	Controller as PromptInputController,
	TextController as TextInputController,
	getPromptInputProvider,
	usePromptInput,
	setPromptInputProvider,
} from "./context/provider.svelte.js";

export type {
	PromptInputAttachment as PromptInputAttachmentData,
	PromptInputUploadStatus,
	FileWithId,
	Message,
	Message as PromptInputMessage,
	ChatStatus,
} from "./context/types.js";

export type { FileUIPart } from "ai";
