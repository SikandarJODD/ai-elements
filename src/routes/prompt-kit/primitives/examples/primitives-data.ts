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

// Import components for preview
import FullChatApp from "$lib/components/prompt-kit-primitives/full-chat-app/FullChatApp.svelte";

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
];

// Export components for preview
export const primitiveComponents = {
	"full-chat-app": FullChatApp,
};
