<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Chat } from "@ai-sdk/svelte";

	// This are from OpenRouter : https://openrouter.ai/models
	let models = [
		{ name: "arcee-ai/trinity-large-preview:free", label: "Acree AI: Trinity Large Preview" },
		{ name: "z-ai/glm-4.5-air:free", label: "Z-AI: GLM-4.5 Air" },
		{ name: "alibaba/wan-2.6", label: "Alibaba: WAN-2.6" },
	];
	let selectedModel: string = $state("");

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
</script>

<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
	<PromptInput.Body>
		<PromptInput.Textarea />
	</PromptInput.Body>
	<PromptInput.Toolbar>
		<Select.Root type="single" name="favoriteFruit" bind:value={selectedModel}>
			<Select.Trigger class="border-none">
				{#if selectedModel}
					{models.find((model) => model.name === selectedModel)?.label}
				{:else}
					Select Model
				{/if}
			</Select.Trigger>
			<Select.Content align="start">
				{#each models as model (model.name)}
					<Select.Item
						value={model.name}
						label={model.label}
						disabled={model.name === "grapes"}
					>
						{model.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<PromptInput.Submit />
	</PromptInput.Toolbar>
</PromptInput.Root>
