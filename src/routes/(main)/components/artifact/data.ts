import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import StreamArtifact from "./examples/stream-artifact.svelte";
import StreamArtifactRaw from "./examples/stream-artifact.svelte?raw";
import CodeSchemaRaw from "$lib/schema/code-schema?raw";

export const meta: ComponentMeta = {
	id: "artifact",
	title: "Artifact",
	description:
		"A structured container for displaying generated content like code, documents, or other outputs with built-in header actions.",
};

const seo: SEO = {
	title: "Artifact",
	description:
		"The Artifact component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.",
	keywords: ["Svelte", "Artifact", "Svelte AI Elements"],
};

let streamArtifactServerFile = `import { streamText, Output } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";
import { codeSchema } from "$lib/schema/code-schema";

export const POST: RequestHandler = async ({ request }) => {
	let context = await request.json();
    console.log("Received context for code generation:", context);

	let result = streamText({
		model: openrouter(defaultModel),
		prompt: \`Generate code based on the following context: \` + context,
		output: Output.object({
			schema: codeSchema,
		}),
	});

	return result.toTextStreamResponse();
};
`;

let aiConfi = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

export let defaultModel = "arcee-ai/trinity-large-preview:free";
`;

const examples: Example[] = [
	{
		name: "Stream Artifact using AI SDK",
		description:
			"we are using `streamText` from the AI SDK to stream generated code output from the server and render it inside the Artifact component in real-time.",
		preview: StreamArtifact,
		code: [
			{
				filename: "stream-artifact.svelte",
				filecode: StreamArtifactRaw,
				lang: "svelte",
				isExpand: true,
				highlight: [4, 5, 8, [11, 14]],
			},
			{
				filename: "code-schema.ts",
				filecode: CodeSchemaRaw,
				lang: "typescript",
				isExpand: true,
			},
			{
				filename: "ai-config.ts",
				filecode: aiConfi,
				lang: "typescript",
				isExpand: true,
			},
			{
				filename: "/api/stream-artifact/+server.ts",
				filecode: streamArtifactServerFile,
				lang: "typescript",
				isExpand: true,
			},
		],
		previewClass: "min-h-200 items-start",
		showRetry: true,
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: Basic,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	examples,
	props: [
		{
			name: "Artifact",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Child components to render",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ArtifactHeader",
			props: [
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components to render (typically title, description, and actions)",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the header",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ArtifactTitle",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Title text content",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the title",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLParagraphElement>",
					description: "All other paragraph props are supported",
				},
			],
		},
		{
			name: "ArtifactDescription",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Description text content",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the description",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLParagraphElement>",
					description: "All other paragraph props are supported",
				},
			],
		},
		{
			name: "ArtifactActions",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Child ArtifactAction components to render",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the actions container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ArtifactAction",
			props: [
				{
					name: "tooltip",
					type: "string",
					description: "Tooltip text to display on hover",
				},
				{
					name: "label",
					type: "string",
					description:
						"Accessible label for screen readers (falls back to tooltip if not provided)",
				},
				{
					name: "icon",
					type: "typeof Icon",
					description: "Lucide icon component to render",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render when icon is not provided",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the button",
				},
				{
					name: "variant",
					type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					default: "'ghost'",
					description: "Visual style variant of the button",
				},
				{
					name: "size",
					type: "'default' | 'sm' | 'lg' | 'icon'",
					default: "'sm'",
					description: "Size of the button",
				},
				{
					name: "onclick",
					type: "(event: MouseEvent) => void",
					description: "Click event handler",
				},
				{
					name: "...restProps",
					type: "HTMLButtonAttributes | HTMLAnchorAttributes",
					description: "All other button or anchor props are supported",
				},
			],
		},
		{
			name: "ArtifactClose",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Custom close icon (defaults to an X icon when not provided)",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the button",
				},
				{
					name: "variant",
					type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					default: "'ghost'",
					description: "Visual style variant of the button",
				},
				{
					name: "size",
					type: "'default' | 'sm' | 'lg' | 'icon'",
					default: "'sm'",
					description: "Size of the button",
				},
				{
					name: "...restProps",
					type: "HTMLButtonAttributes | HTMLAnchorAttributes",
					description: "All other button or anchor props are supported",
				},
			],
		},
		{
			name: "ArtifactContent",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Content to render inside the artifact",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
	],
};
