export type PrimitiveFile = {
	name: string;
	path: string;
	content: string;
};

export type PrimitiveConfig = {
	id: string;
	title: string;
	description: string;
	demoUrl: string;
	registryName: string;
	componentFiles: PrimitiveFile[];
	apiFile: {
		name: string;
		path: string;
		content: string;
	};
};

// Import raw file contents
import FullChatAppRaw from "$lib/components/prompt-kit-primitives/full-chat-app/FullChatApp.svelte?raw";
import MessageComponentRaw from "$lib/components/prompt-kit-primitives/full-chat-app/MessageComponent.svelte?raw";
import LoadingMessageRaw from "$lib/components/prompt-kit-primitives/full-chat-app/LoadingMessage.svelte?raw";
import ErrorMessageRaw from "$lib/components/prompt-kit-primitives/full-chat-app/ErrorMessage.svelte?raw";
import FullChatAppApiRaw from "$lib/../routes/api/primitives/full-chat-app/+server.ts?raw";

import ToolCallingAppRaw from "$lib/components/prompt-kit-primitives/tool-calling/ToolCallingApp.svelte?raw";
import ToolCallingMessageComponentRaw from "$lib/components/prompt-kit-primitives/tool-calling/MessageComponent.svelte?raw";
import ToolCallingLoadingMessageRaw from "$lib/components/prompt-kit-primitives/tool-calling/LoadingMessage.svelte?raw";
import ToolCallingErrorMessageRaw from "$lib/components/prompt-kit-primitives/tool-calling/ErrorMessage.svelte?raw";
import ToolCallingApiRaw from "$lib/../routes/api/primitives/tool-call/+server.ts?raw";

// Import components for preview
import FullChatApp from "$lib/components/prompt-kit-primitives/full-chat-app/FullChatApp.svelte";
import ToolCallingApp from "$lib/components/prompt-kit-primitives/tool-calling/ToolCallingApp.svelte";

export const primitives: PrimitiveConfig[] = [
	{
		id: "full-chat-app",
		title: "Full chatbot",
		description:
			"A complete chat application with streaming responses, tool calling, and error handling. Built with the Vercel AI SDK and OpenRouter.",
		demoUrl: "/demo-full-chat",
		registryName: "full-chat-app",
		componentFiles: [
			{
				name: "FullChatApp.svelte",
				path: "components/FullChatApp.svelte",
				content: FullChatAppRaw,
			},
			{
				name: "MessageComponent.svelte",
				path: "components/MessageComponent.svelte",
				content: MessageComponentRaw,
			},
			{
				name: "LoadingMessage.svelte",
				path: "components/LoadingMessage.svelte",
				content: LoadingMessageRaw,
			},
			{
				name: "ErrorMessage.svelte",
				path: "components/ErrorMessage.svelte",
				content: ErrorMessageRaw,
			},
		],
		apiFile: {
			name: "+server.ts",
			path: "routes/api/primitives/full-chat-app/+server.ts",
			content: FullChatAppApiRaw,
		},
	},
	{
		id: "tool-calling",
		title: "Tool calling chatbot",
		description:
			"A chatbot with tool execution capabilities. Demonstrates how to integrate AI function calling with timezone and date/time tools using the Vercel AI SDK and OpenRouter.",
		demoUrl: "/demo-tool-call",
		registryName: "tool-calling",
		componentFiles: [
			{
				name: "ToolCallingApp.svelte",
				path: "components/ToolCallingApp.svelte",
				content: ToolCallingAppRaw,
			},
			{
				name: "MessageComponent.svelte",
				path: "components/MessageComponent.svelte",
				content: ToolCallingMessageComponentRaw,
			},
			{
				name: "LoadingMessage.svelte",
				path: "components/LoadingMessage.svelte",
				content: ToolCallingLoadingMessageRaw,
			},
			{
				name: "ErrorMessage.svelte",
				path: "components/ErrorMessage.svelte",
				content: ToolCallingErrorMessageRaw,
			},
		],
		apiFile: {
			name: "+server.ts",
			path: "routes/api/primitives/tool-call/+server.ts",
			content: ToolCallingApiRaw,
		},
	},
];

// Export components for preview
export const primitiveComponents = {
	"full-chat-app": FullChatApp,
	"tool-calling": ToolCallingApp,
};
