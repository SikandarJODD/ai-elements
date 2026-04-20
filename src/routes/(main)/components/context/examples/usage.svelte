<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input/index";
	import * as Message from "$lib/components/ai-elements/message/index";
	import * as Context from "$lib/components/ai-elements/context/index.js";
	import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input/context/types";
	import { Chat } from "@ai-sdk/svelte";

	type TokenUsageMetadata = {
		inputTokens?: number;
		outputTokens?: number;
		reasoningTokens?: number;
		totalTokens?: number;
	};
	let tokensData: TokenUsageMetadata = $state({
		inputTokens: 0,
		outputTokens: 0,
		reasoningTokens: 0,
		totalTokens: 0,
	});

	let chat = new Chat({
		onFinish: (msg) => {
			const metadata = msg.message.metadata as TokenUsageMetadata;
			tokensData = {
				inputTokens: metadata.inputTokens ?? 0,
				outputTokens: metadata.outputTokens ?? 0,
				reasoningTokens: metadata.reasoningTokens ?? 0,
				totalTokens: metadata.totalTokens ?? 0,
			};
			// console.log("Chat finished. Token usage:", tokensData);
		},
	});

	let handleSubmit = (content: PromptInputMessage) => {
		chat.sendMessage({
			text: content.text,
		});
	};
	let handleStop = () => {
		chat.stop();
	};
</script>

<div class="flex flex-col gap-4">
	<div>
		<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
			<PromptInput.Textarea placeholder="Type your prompt here..." />
			<PromptInput.Toolbar class="justify-end gap-2">
				<div>
					<Context.Root
						maxTokens={131_000}
						modelId="arcee-ai/trinity-large-preview:free"
						usage={{
							inputTokens: tokensData.inputTokens ?? 0,
							outputTokens: tokensData.outputTokens ?? 0,
							reasoningTokens: tokensData.reasoningTokens ?? 0,
						}}
						usedTokens={tokensData.totalTokens ?? 0}
					>
						<Context.Trigger />
						<Context.Content sideOffset={10}>
							<Context.ContentHeader />
							<Context.ContentBody>
								<Context.InputUsage />
								<Context.OutputUsage />
								<Context.ReasoningUsage />
								<Context.CacheUsage />
							</Context.ContentBody>
							<Context.ContentFooter />
						</Context.Content>
					</Context.Root>
				</div>
				<PromptInput.Submit status={chat.status} onStop={handleStop} />
			</PromptInput.Toolbar>
		</PromptInput.Root>
	</div>

	<div>
		{#if chat.messages.length > 0}
			<div class="max-h-90 max-w-xl overflow-y-auto flex flex-col gap-4">
				{#each chat.messages as message}
					<Message.Root from={message.role}>
						<Message.Content>
							{#each message.parts as part}
								{#if part.type === "text"}
									<Message.Response content={part.text} />
								{/if}
							{/each}
						</Message.Content>
					</Message.Root>
				{/each}
			</div>
		{:else}
			<p class="text-muted-foreground text-sm p-2 border rounded-md">
				No messages yet. Start the conversation by typing a prompt above.
			</p>
		{/if}
	</div>
</div>
