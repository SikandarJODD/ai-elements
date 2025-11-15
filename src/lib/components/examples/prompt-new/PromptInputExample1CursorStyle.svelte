<script lang="ts">
	import {
		PromptInput,
		PromptInputActionAddAttachments,
		PromptInputActionMenu,
		PromptInputActionMenuContent,
		PromptInputActionMenuItem,
		PromptInputActionMenuTrigger,
		PromptInputAttachment,
		PromptInputAttachments,
		PromptInputBody,
		PromptInputButton,
		PromptInputFooter,
		PromptInputModelSelect,
		PromptInputModelSelectContent,
		PromptInputModelSelectItem,
		PromptInputModelSelectTrigger,
		PromptInputModelSelectValue,
		PromptInputSpeechButton,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import { Globe, Settings } from "@lucide/svelte";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let model = $state("gpt-4o");
	let modelName = $state("GPT-4o");
	let textareaRef = $state<HTMLTextAreaElement | null>(null);

	const models = [
		{ id: "gpt-4o", name: "GPT-4o" },
		{ id: "gpt-4o-mini", name: "GPT-4o Mini" },
		{ id: "claude-sonnet-4", name: "Claude 4 Sonnet" },
		{ id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
	];

	const handleSubmit = (message: PromptInputMessage) => {
		console.log("Submitting:", message);
		status = "submitted";

		setTimeout(() => {
			status = "streaming";
		}, 200);

		setTimeout(() => {
			status = "ready";
		}, 2000);
	};
</script>

<div class="mx-auto w-full max-w-3xl">
	<PromptInput globalDrop multiple onSubmit={handleSubmit}>
		<PromptInputAttachments>
			{#snippet children(file)}
				<PromptInputAttachment data={file} />
			{/snippet}
		</PromptInputAttachments>

		<PromptInputBody>
			<PromptInputTextarea
				bind:ref={textareaRef}
				placeholder="What would you like to build?"
			/>
		</PromptInputBody>

		<PromptInputFooter>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
						<PromptInputActionMenuItem>
							<Settings class="mr-2 size-4" />
							Settings
						</PromptInputActionMenuItem>
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>

				<PromptInputSpeechButton {textareaRef} />

				<PromptInputButton>
					<Globe size={16} />
					<span>Search</span>
				</PromptInputButton>

				<PromptInputModelSelect
					bind:value={model}
					onValueChange={(value) => {
						if (value) {
							model = value;
							const selectedModel = models.find((m) => m.id === model);
							modelName = selectedModel ? selectedModel.name : "";
						}
					}}
				>
					<PromptInputModelSelectTrigger>
						<PromptInputModelSelectValue value={modelName} placeholder="Select Model" />
					</PromptInputModelSelectTrigger>
					<PromptInputModelSelectContent>
						{#each models as modelOption (modelOption.id)}
							<PromptInputModelSelectItem value={modelOption.id}>
								{modelOption.name}
							</PromptInputModelSelectItem>
						{/each}
					</PromptInputModelSelectContent>
				</PromptInputModelSelect>
			</PromptInputTools>

			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>
</div>

<div class="text-muted-foreground mt-4 text-center text-sm">
	<p>Full-featured Cursor-style prompt input with all tools</p>
</div>
