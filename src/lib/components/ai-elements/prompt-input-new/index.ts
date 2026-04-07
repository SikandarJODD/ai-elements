import AddAttachments, { type AddAttachmentsProps } from "./actions/add-attachments.svelte";
import AddScreenshot, { type AddScreenshotProps } from "./actions/add-screenshot.svelte";
import ActionMenuTrigger from "./actions/action-menu-trigger.svelte";
import {
	getAttachments,
	getController,
	getOptionalProviderController,
	getReferencedSources,
} from "./core/context.js";
import {
	AttachmentStoreController,
	PromptInputProviderController,
	PromptInputRootController,
	ReferencedSourcesController,
	TextInputController,
	ValidatedAttachmentsController,
} from "./core/controllers.svelte.js";
import {
	captureScreenshot,
	createAttachmentFromFile,
	createPromptInputId,
} from "./core/utils.js";
import type {
	PromptInputError,
	PromptInputErrorCode,
	PromptInputFilesAddPayload,
	PromptInputFilesAddSource,
	PromptInputFilesRemovePayload,
	PromptInputFilesRemoveSource,
	PromptInputAttachment,
	PromptInputMessage,
	PromptInputSource,
	PromptInputStatus,
	PromptInputSubmitAttachment,
	PromptInputValidationOptions,
} from "./core/types.js";
import Button, { type ButtonProps, type ButtonTooltip } from "./controls/button.svelte";
import Submit, { type SubmitProps } from "./controls/submit.svelte";
import Textarea, { type TextareaProps } from "./controls/textarea.svelte";
import Body from "./layout/body.svelte";
import Footer from "./layout/footer.svelte";
import Header from "./layout/header.svelte";
import Tools from "./layout/tools.svelte";
import AttachmentsPreview, { type AttachmentsPreviewProps } from "./preview/attachments-preview.svelte";
import Provider, { type ProviderProps } from "./root/provider.svelte";
import Root, { type RootProps, type RootSubmitEvent } from "./root/root.svelte";
import TabBody from "./tabs/tab-body.svelte";
import TabItem from "./tabs/tab-item.svelte";
import TabLabel from "./tabs/tab-label.svelte";
import Tab from "./tabs/tab.svelte";
import TabsList from "./tabs/tabs-list.svelte";

export {
	Root,
	Provider,
	Body,
	Header,
	Footer,
	Tools,
	Textarea,
	Button,
	Submit,
	ActionMenuTrigger,
	AddAttachments,
	AddScreenshot,
	AttachmentsPreview,
	TabsList,
	Tab,
	TabLabel,
	TabBody,
	TabItem,
	getOptionalProviderController,
	getAttachments,
	getController,
	getReferencedSources,
	AttachmentStoreController,
	PromptInputProviderController,
	PromptInputRootController,
	ReferencedSourcesController,
	TextInputController,
	ValidatedAttachmentsController,
	captureScreenshot,
	createAttachmentFromFile,
	createPromptInputId,
};

export type {
	AddAttachmentsProps,
	AddScreenshotProps,
	AttachmentsPreviewProps,
	ButtonProps,
	ButtonTooltip,
	ProviderProps,
	RootProps,
	RootSubmitEvent,
	SubmitProps,
	TextareaProps,
	PromptInputError,
	PromptInputErrorCode,
	PromptInputFilesAddPayload,
	PromptInputFilesAddSource,
	PromptInputFilesRemovePayload,
	PromptInputFilesRemoveSource,
	PromptInputAttachment,
	PromptInputMessage,
	PromptInputSource,
	PromptInputStatus,
	PromptInputSubmitAttachment,
	PromptInputValidationOptions,
};
