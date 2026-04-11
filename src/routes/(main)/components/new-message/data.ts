import Preview from "./examples/preview.svelte";
import previewRaw from "./examples/preview.svelte?raw";
import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";
import FileAttachment from "./examples/file-attachment.svelte";
import fileAttachmentRaw from "./examples/file-attachment.svelte?raw";
import Branch from "./examples/branch.svelte";
import branchRaw from "./examples/branch.svelte?raw";
import PromptInputExample from "./examples/message-chat.svelte";
import promptInputRaw from "./examples/message-chat.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";

export const meta: ComponentMeta = {
	id: "new-message",
	title: "Message",
	description:
		"Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.",
	category: "utilities",
};

const seo: SEO = {
	title: "Message",
	description:
		"Build chat interfaces with role-aware messages, markdown rendering, file attachments, and branch navigation in Svelte.",
	keywords: ["Svelte", "Message", "Chat UI", "Svelte AI Elements"],
};

const examples: Example[] = [
	{
		name: "Basic Example",
		description: "Render user and assistant messages with markdown output.",
		preview: Basic,
		code: {
			filename: "basic.svelte",
			filecode: basicRaw,
			lang: "svelte",
			isExpand: true,
		},
		showRetry: false,
	},
	{
		name: "File Attachment Example",
		description: "Show image and file attachments with the built-in preview dialog.",
		preview: FileAttachment,
		code: {
			filename: "file-attachment.svelte",
			filecode: fileAttachmentRaw,
			lang: "svelte",
			isExpand: true,
		},
		showRetry: false,
	},
	{
		name: "Branch Example",
		description:
			"Switch between multiple assistant versions with the simplified branching API.",
		preview: Branch,
		code: {
			filename: "branch.svelte",
			filecode: branchRaw,
			lang: "svelte",
			isExpand: true,
		},
		showRetry: false,
	},
	{
		name: "Usage AI SDK",
		description: "Compose prompt-input with new-message using a local text-only workflow.",
		preview: PromptInputExample,
		code: {
			filename: "message-chat.svelte",
			filecode: promptInputRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: previewRaw,
		lang: "svelte",
		isExpand: false,
	},
	seo,
	examples,
	props: [
		{
			name: "Message",
			props: [
				{
					name: "from",
					type: "'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'",
					description: "Controls alignment and role-aware styling.",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"MessageContent, MessageBranch, MessageAttachments, or MessageToolbar.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the outer message wrapper.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageContent",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Plain text or nested renderers such as MessageResponse.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the message body container.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageResponse",
			props: [
				{
					name: "content",
					type: "string",
					description: "Markdown content rendered through svelte-streamdown.",
				},
				{
					name: "components",
					type: 'StreamdownProps["components"]',
					description:
						"Optional component overrides merged with the built-in code, mermaid, and math renderers.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the markdown wrapper.",
				},
				{
					name: "...restProps",
					type: 'Omit<StreamdownProps, "class" | "content" | "components">',
					description: "Additional Streamdown props are forwarded.",
				},
			],
		},
		{
			name: "MessageToolbar",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Usually MessageActions or MessageBranchSelector.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the toolbar row.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageActions",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "One or more MessageAction components.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the actions row.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageAction",
			props: [
				{
					name: "tooltip",
					type: "string",
					description: "Tooltip text displayed on hover.",
				},
				{
					name: "label",
					type: "string",
					description: "Accessible label used for screen readers.",
				},
				{
					name: "variant",
					type: "ButtonVariant",
					default: "'ghost'",
					description: "Visual button variant.",
				},
				{
					name: "size",
					type: "ButtonSize",
					default: "'icon'",
					description: "Button size passed to the shared button component.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the action button.",
				},
				{
					name: "disabled",
					type: "boolean",
					description: "Disables the action button.",
				},
				{
					name: "onclick",
					type: "(event: MouseEvent) => void",
					description: "Click handler for the action button.",
				},
				{
					name: "...restProps",
					type: 'Omit<ButtonProps, "children" | "type" | "href">',
					description: "Additional button props are forwarded.",
				},
			],
		},
		{
			name: "MessageBranch",
			props: [
				{
					name: "defaultBranch",
					type: "number",
					default: "0",
					description: "Initial version index.",
				},
				{
					name: "onBranchChange",
					type: "(branchIndex: number) => void",
					description: "Called whenever the active branch changes.",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Usually MessageBranchContent plus a MessageToolbar containing MessageBranchSelector.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the branch wrapper.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageBranchContent",
			props: [
				{
					name: "versions",
					type: "{ id: string; content: string }[]",
					description:
						"Assistant message versions rendered with MessageResponse internally.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for each rendered version container.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageBranchSelector",
			props: [
				{
					name: "children",
					type: "Snippet",
					description:
						"Typically MessageBranchPrevious, MessageBranchPage, and MessageBranchNext.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the button group.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageBranchPrevious",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Optional custom previous icon/content.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the previous button.",
				},
				{
					name: "...restProps",
					type: 'Omit<ButtonProps, "children" | "type" | "href">',
					description: "Additional button props are forwarded.",
				},
			],
		},
		{
			name: "MessageBranchNext",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Optional custom next icon/content.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the next button.",
				},
				{
					name: "...restProps",
					type: 'Omit<ButtonProps, "children" | "type" | "href">',
					description: "Additional button props are forwarded.",
				},
			],
		},
		{
			name: "MessageBranchPage",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: 'Optional custom page text. Defaults to "current of total".',
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the page label.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageAttachments",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "One or more MessageAttachment components.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the attachments row.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageAttachment",
			props: [
				{
					name: "data",
					type: '{ type: "file"; filename?: string; mediaType?: string; url?: string }',
					description: "Attachment payload used for images and generic files.",
				},
				{
					name: "onRemove",
					type: "() => void",
					description: "Optional handler for the remove button.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the attachment tile.",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported.",
				},
			],
		},
		{
			name: "MessageAttachmentPreview",
			props: [
				{
					name: "data",
					type: '{ type: "file"; filename?: string; mediaType?: string; url?: string }',
					description: "Image attachment data rendered inside the preview dialog.",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes for the trigger surface.",
				},
			],
		},
	],
};
