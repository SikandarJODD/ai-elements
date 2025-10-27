<script lang="ts">
	import {
		PromptInput,
		PromptInputActionAddAttachments,
		PromptInputActionMenu,
		PromptInputActionMenuContent,
		PromptInputActionMenuTrigger,
		PromptInputAttachment,
		PromptInputAttachments,
		PromptInputBody,
		PromptInputButton,
		type PromptInputMessage,
		PromptInputModelSelect,
		PromptInputModelSelectContent,
		PromptInputModelSelectItem,
		PromptInputModelSelectTrigger,
		PromptInputModelSelectValue,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputToolbar,
		PromptInputTools,
		type ChatStatus,
	} from "$lib/components/ai-elements/prompt-input/index.js";
	import MicIcon from "@lucide/svelte/icons/mic";
	import GlobeIcon from "@lucide/svelte/icons/globe";

	let models = [
		{ id: "gpt-4", name: "GPT-4" },
		{ id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
		{ id: "claude-2", name: "Claude 2" },
		{ id: "claude-instant", name: "Claude Instant" },
		{ id: "palm-2", name: "PaLM 2" },
		{ id: "llama-2-70b", name: "Llama 2 70B" },
		{ id: "llama-2-13b", name: "Llama 2 13B" },
		{ id: "cohere-command", name: "Command" },
		{ id: "mistral-7b", name: "Mistral 7B" },
	];

	let SUBMITTING_TIMEOUT = 200;
	let STREAMING_TIMEOUT = 2000;

	let text = $state<string>("");
	let model = $state<string>(models[0].id);
	let model_name = $state<string>(models[0].name);
	let status = $state<ChatStatus>("idle");

	let handleSubmit = (message: PromptInputMessage) => {
		let hasText = Boolean(message.text);
		let hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		status = "submitted";

		console.log("Submitting message:", message);

		setTimeout(() => {
			status = "streaming";
		}, SUBMITTING_TIMEOUT);

		setTimeout(() => {
			status = "idle";
		}, STREAMING_TIMEOUT);
	};

	$inspect(model, model_name, "model");
</script>

<div class="mx-auto max-w-2xl p-4">
	<!-- <h2 class="text-2xl font-bold mb-4">Prompt Input Example</h2> -->

	<PromptInput globalDrop multiple onSubmit={handleSubmit}>
		<PromptInputBody>
			<PromptInputAttachments>
				{#snippet children(attachment)}
					<PromptInputAttachment data={attachment} />
				{/snippet}
			</PromptInputAttachments>
			<PromptInputTextarea
				bind:value={text}
				onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
			/>
		</PromptInputBody>
		<PromptInputToolbar>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
				<PromptInputButton>
					<MicIcon size={16} />
				</PromptInputButton>
				<PromptInputButton size="default">
					<GlobeIcon size={16} />
					<span>Search</span>
				</PromptInputButton>
				<PromptInputModelSelect
					bind:value={model}
					onValueChange={(value) => {
						if (value) {
							model = value;
							const selectedModel = models.find((m) => m.id === model);
							model_name = selectedModel ? selectedModel.name : "";
						}
					}}
				>
					<PromptInputModelSelectTrigger>
						<PromptInputModelSelectValue
							value={model_name}
							placeholder="Select Model"
						/>
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
		</PromptInputToolbar>
	</PromptInput>

	<!-- <div class="mt-4 p-4 bg-background rounded-lg">
    <h3 class="font-semibold mb-2">Debug Info:</h3>
    <p><strong>Text:</strong> {text || "(empty)"}</p>
    <p><strong>Model:</strong> {model}</p>
    <p><strong>Status:</strong> {status}</p>
  </div> -->
</div>
