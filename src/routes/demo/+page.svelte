<script lang="ts">
	import { CodeNameBlock, Subheading } from '$lib';
</script>

<svelte:head>
	<title>Guide to Svelte 5 + AI SDK</title>
</svelte:head>

<div class="container mx-auto p-8 space-y-8">
	<h1 class="text-4xl font-bold">Guide to Svelte 5 + AI SDK</h1>
	
	<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground">
		A simple guide to building AI-powered applications with Svelte 5's new runes system and the AI SDK. Learn how to create reactive AI interfaces with modern Svelte.
	</blockquote>
	
	<div class="space-y-8">
		<section>
			<Subheading>Setting Up Your Project</Subheading>
			<p class="text-muted-foreground mb-4">Start by creating a new SvelteKit project and installing the AI SDK:</p>
			<CodeNameBlock
				filename="setup.sh"
				lang="bash"
				code={`npm create svelte@latest my-ai-app
cd my-ai-app
npm install
npm install ai @ai-sdk/openai`}
			/>
		</section>

		<section>
			<Subheading>Basic AI Chat Component</Subheading>
			<p class="text-muted-foreground mb-4">Create a simple chat component using Svelte 5 runes and the useChat hook:</p>
			<CodeNameBlock
				filename="Chat.svelte"
				lang="svelte"
				code={`<script lang="ts">
	import { useChat } from 'ai/svelte';
	
	const { input, handleSubmit, messages } = useChat();
<\/script>

<div class="chat-container">
	{#each $messages as message}
		<div class="message message-{message.role}">
			{message.content}
		</div>
	{/each}
	
	<form on:submit={handleSubmit}>
		<input bind:value={$input} placeholder="Type a message..." />
		<button type="submit">Send</button>
	</form>
</div>`}
			/>
		</section>

		<section>
			<Subheading>API Route Handler</Subheading>
			<p class="text-muted-foreground mb-4">Set up your API route to handle chat requests:</p>
			<CodeNameBlock
				filename="+server.ts"
				lang="typescript"
				code={`import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	const result = await streamText({
		model: openai('gpt-3.5-turbo'),
		messages,
	});

	return result.toDataStreamResponse();
};`}
			/>
		</section>

		<section>
			<Subheading>Advanced State Management</Subheading>
			<p class="text-muted-foreground mb-4">Use Svelte 5 runes for reactive AI state management:</p>
			<CodeNameBlock
				filename="ai-store.svelte.ts"
				lang="typescript"
				code={`import { useChat } from 'ai/svelte';

class AIStore {
	chat = useChat();
	isTyping = $state(false);
	
	async sendMessage(message: string) {
		this.isTyping = true;
		await this.chat.append({ role: 'user', content: message });
		this.isTyping = false;
	}
}

export const aiStore = new AIStore();`}
			/>
		</section>

		<section>
			<Subheading>Environment Configuration</Subheading>
			<p class="text-muted-foreground mb-4">Configure your environment variables:</p>
			<CodeNameBlock
				filename=".env.local"
				lang="text"
				code={`OPENAI_API_KEY=your_openai_api_key_here`}
			/>
		</section>
	</div>
</div>