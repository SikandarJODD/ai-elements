import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import ToolStates from "./examples/tool-states.svelte";
import ToolStatesRaw from "./examples/tool-states.svelte?raw";
import ToolStatesCompact from "./examples/tool-states-compact.svelte";
import ToolStatesCompactRaw from "./examples/tool-states-compact.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import type { PropDefinition } from "$lib/components/docs";

export const meta: ComponentMeta = {
	id: "tool",
	title: "Tool",
	description:
		"Displays tool call details including input, output, status, and errors. Ideal for visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Tool",
	description:
		"A Svelte component for displaying AI tool call details, including input, output, status, and errors. Perfect for visualizing AI tool usage in chat interfaces.",
	keywords: ["Svelte", "Tool", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

// Tool (Root) Component Props
export const toolProps: PropDefinition[] = [
	{
		name: "toolPart",
		type: "ToolPart",
		description: "The tool invocation data to display",
	},
	{
		name: "defaultOpen",
		type: "boolean",
		default: "false",
		description: "Whether the tool details are expanded by default",
	},
	{
		name: "open",
		type: "boolean",
		description: "Controlled open state (bindable)",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components (ToolHeader, ToolContent)",
	},
];

// ToolComposed Component Props
export const toolComposedProps: PropDefinition[] = [
	{
		name: "toolPart",
		type: "ToolPart",
		description: "The tool invocation data to display",
	},
	{
		name: "defaultOpen",
		type: "boolean",
		default: "false",
		description: "Whether the tool details are expanded by default",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

// ToolHeader Component Props
export const toolHeaderProps: PropDefinition[] = [
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

// ToolContent Component Props
export const toolContentProps: PropDefinition[] = [
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Content to display (usually ToolDetails)",
	},
];

// ToolDetails Component Props
export const toolDetailsProps: PropDefinition[] = [
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

// ToolBadge Component Props
export const toolBadgeProps: PropDefinition[] = [
	{
		name: "state",
		type: "ToolState",
		description:
			"The state of the tool: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

// ToolPart Type Definition
export const toolPartProps: PropDefinition[] = [
	{
		name: "type",
		type: "string",
		description: "The name/type of the tool (e.g., 'get_weather', 'search_web')",
	},
	{
		name: "state",
		type: "ToolState",
		description:
			"The state of the tool: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'",
	},
	{
		name: "input",
		type: "Record<string, unknown>",
		description: "The input parameters passed to the tool (optional)",
	},
	{
		name: "output",
		type: "Record<string, unknown>",
		description: "The output data returned from the tool (optional)",
	},
	{
		name: "toolCallId",
		type: "string",
		description: "Unique identifier for the tool call (optional)",
	},
	{
		name: "errorText",
		type: "string",
		description: "Error message if the tool execution failed (optional)",
	},
];

// ToolState Type Definition
export const toolStateType = `type ToolState =
  | "input-streaming"    // Tool is receiving input
  | "input-available"    // Tool has input and is ready to execute
  | "output-available"   // Tool has successfully executed
  | "output-error";      // Tool execution failed`;

const examples: Example[] = [
	{
		name: "Tool States",
		preview: ToolStates,
		code: {
			filename: "tool-states.svelte",
			filecode: ToolStatesRaw,
		},
	},
	{
		name: "Tool States Compact",
		preview: ToolStatesCompact,
		code: {
			filename: "tool-states-compact.svelte",
			filecode: ToolStatesCompactRaw,
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "Tool",
			props: toolProps,
		},
		{
			name: "Tool Composed",
			props: toolComposedProps,
		},
		{
			name: "Tool Header",
			props: toolHeaderProps,
		},
		{
			name: "Tool Content",
			props: toolContentProps,
		},
		{
			name: "Tool Details",
			props: toolDetailsProps,
		},
		{
			name: "Tool Badge",
			props: toolBadgeProps,
		},
		{
			name: "Tool Part",
			props: toolPartProps,
		},
		{
			name: "Tool State",
			props: [
				{
					name: "ToolState",
					type: "type",
					description: "The ToolState type definition",
					default: toolStateType,
				},
			],
		},
	],
};
