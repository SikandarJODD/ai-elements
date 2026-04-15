import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "file-upload",
	title: "File Upload",
	description:
		"A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.",
	category: "utilities",
};

const seo: SEO = {
	title: "File Upload",
	description:
		"A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.",
	keywords: ["Svelte", "File Upload", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};
// Component API Props Data
const fileUploadProps = [
	{
		name: "onFilesAdded",
		type: "(files: File[]) => void",
		description: "Function called when files are added",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components",
	},
	{
		name: "multiple",
		type: "boolean",
		default: "true",
		description: "Allow selection of multiple files",
	},
	{
		name: "accept",
		type: "string",
		description: 'File types to accept (e.g., ".jpg,.png")',
	},
];

const fileUploadTriggerProps = [
	{
		name: "asChild",
		type: "boolean",
		default: "false",
		description: "Use child element as the trigger",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLButtonElement>",
		description: "All other button props",
	},
];

const fileUploadContentProps = [
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props",
	},
];
const examples: Example[] = [];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "file-upload-preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "File Upload",
			props: fileUploadProps,
		},
		{
			name: "File Upload Trigger",
			props: fileUploadTriggerProps,
		},
		{
			name: "File Upload Content",
			props: fileUploadContentProps,
		},
	],
};
