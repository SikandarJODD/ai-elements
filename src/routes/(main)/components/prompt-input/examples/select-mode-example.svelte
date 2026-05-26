<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Chat } from "@ai-sdk/svelte";

	// This are from OpenRouter : https://openrouter.ai/models
	let models = [
		{ name: "arcee-ai/trinity-large-preview:free", label: "Arcee AI: Trinity Large Preview" },
		{ name: "deepseek/deepseek-v4-flash:free", label: "DeepSeek: DeepSeek V4 Flash" },
		{ name: "openrouter/elephant-alpha", label: "OpenRouter: Elephant Alpha" },
	];
	let selectedModel = $state("");

	let chat = new Chat({});

	function handleSubmit(message: Message) {
		chat.sendMessage(
			{
				text: message.text,
			},
			{
				body: {
					model: selectedModel,
				},
			}
		);
	}

	let handleStop = () => {
		chat.stop();
	};
</script>

<div class="space-y-4">
	<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
		<PromptInput.Body>
			<PromptInput.Textarea />
		</PromptInput.Body>
		<PromptInput.Toolbar>
			<Select.Root type="single" bind:value={selectedModel}>
				<Select.Trigger class="border-none">
					{#if selectedModel}
						{models.find((model) => model.name === selectedModel)?.label}
					{:else}
						Select Model
					{/if}
				</Select.Trigger>
				<Select.Content align="start">
					{#each models as model (model.name)}
						<Select.Item value={model.name} label={model.label}>
							{model.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<PromptInput.Submit status={chat.status} onStop={handleStop} />
		</PromptInput.Toolbar>
	</PromptInput.Root>

	{#if chat.messages.length > 0}
		<main class="max-w-xl p-2">
			<ul>
				{#each chat.messages as message, messageIndex (messageIndex)}
					<li>
						<div class="text-base font-semibold">{message.role}</div>
						<div>
							{#each message.parts as part, partIndex (partIndex)}
								{#if part.type === "text"}
									<div class="text-muted-foreground text-sm">{part.text}</div>
								{/if}
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		</main>
	{:else}
		<p class="text-muted-foreground pl-0.5 text-sm">Please send message to view response...</p>
	{/if}
</div>
