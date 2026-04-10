import Root from "./core/Root.svelte";
import Provider from "./core/Provider.svelte";
import Header from "./layout/Header.svelte";
import Body from "./layout/Body.svelte";
import Toolbar from "./layout/Toolbar.svelte";
import Tools from "./layout/Tools.svelte";
import Button from "./controls/Button.svelte";
import Textarea from "./controls/Textarea.svelte";
import Submit from "./controls/Submit.svelte";
import Attachment from "./attachments/Attachment.svelte";
import AttachmentImagePreview from "./attachments/AttachmentImagePreview.svelte";
import Attachments from "./attachments/Attachments.svelte";
import ActionMenu from "./action-menu/ActionMenu.svelte";
import ActionMenuTrigger from "./action-menu/ActionMenuTrigger.svelte";
import ActionMenuContent from "./action-menu/ActionMenuContent.svelte";
import ActionMenuItem from "./action-menu/ActionMenuItem.svelte";
import ActionAddAttachments from "./action-menu/ActionAddAttachments.svelte";
import ModelSelect from "./model-select/ModelSelect.svelte";
import ModelSelectTrigger from "./model-select/ModelSelectTrigger.svelte";
import ModelSelectContent from "./model-select/ModelSelectContent.svelte";
import ModelSelectItem from "./model-select/ModelSelectItem.svelte";
import ModelSelectValue from "./model-select/ModelSelectValue.svelte";
import ImageIcon from "./icons/ImageIcon.svelte";
import Loader2Icon from "./icons/Loader2Icon.svelte";
import PaperclipIcon from "./icons/PaperclipIcon.svelte";
import PlusIcon from "./icons/PlusIcon.svelte";
import SendIcon from "./icons/SendIcon.svelte";
import SquareIcon from "./icons/SquareIcon.svelte";
import XIcon from "./icons/XIcon.svelte";
import GlobeIcon from "./icons/GlobeIcon.svelte";
import MicIcon from "./icons/MicIcon.svelte";

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
	ModelSelect,
	ModelSelectTrigger,
	ModelSelectContent,
	ModelSelectItem,
	ModelSelectValue,
	ImageIcon,
	Loader2Icon,
	PaperclipIcon,
	PlusIcon,
	SendIcon,
	SquareIcon,
	XIcon,
	GlobeIcon,
	MicIcon,
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
	ModelSelect as PromptInputModelSelect,
	ModelSelectTrigger as PromptInputModelSelectTrigger,
	ModelSelectContent as PromptInputModelSelectContent,
	ModelSelectItem as PromptInputModelSelectItem,
	ModelSelectValue as PromptInputModelSelectValue,
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
	getPromptInputController,
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
