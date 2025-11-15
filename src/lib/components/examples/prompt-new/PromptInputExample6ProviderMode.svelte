<script lang="ts">
	import {
		PromptInput,
		PromptInputAttachment,
		PromptInputAttachments,
		PromptInputBody,
		PromptInputFooter,
		PromptInputProvider,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
		getPromptInputController,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let messages = $state<PromptInputMessage[]>([]);

	const handleSubmit = (message: PromptInputMessage) => {
		messages = [...messages, message];
		console.log("Submitted:", message);
		status = "submitted";
		setTimeout(() => (status = "ready"), 1000);
	};

	// External control functions
	const clearInput = () => {
		const controller = getPromptInputController();
		controller.textInput.clear();
	};

	const setInput = () => {
		const controller = getPromptInputController();
		controller.textInput.setInput("This text was inserted via external controls!");
	};

	const clearAttachments = () => {
		const controller = getPromptInputController();
		controller.attachments.clear();
	};
</script>

<div class="mx-auto w-full max-w-3xl space-y-4">
	<div class="bg-card rounded-lg border p-4">
		<h3 class="mb-2 font-semibold">Provider Mode with External Controls</h3>
		<p class="text-muted-foreground text-sm">
			Use PromptInputProvider to control the input from outside the component.
		</p>
	</div>

	<PromptInputProvider>
		<!-- External Controls -->
		<div class="bg-muted flex items-center justify-between rounded-lg border p-4">
			<p class="text-sm font-medium">External Controls:</p>
			<div class="flex gap-2">
				<Button size="sm" variant="outline" onclick={clearInput}>Clear Input</Button>
				<Button size="sm" variant="outline" onclick={setInput}>Set Input</Button>
				<Button size="sm" variant="outline" onclick={clearAttachments}>
					Clear Attachments
				</Button>
			</div>
		</div>

		<!-- Prompt Input -->
		<PromptInput globalDrop multiple onSubmit={handleSubmit}>
			<PromptInputAttachments>
				{#snippet children(file)}
					<PromptInputAttachment data={file} />
				{/snippet}
			</PromptInputAttachments>

			<PromptInputBody>
				<PromptInputTextarea placeholder="Type something or use the controls above..." />
			</PromptInputBody>

			<PromptInputFooter>
				<PromptInputTools />
				<PromptInputSubmit {status} />
			</PromptInputFooter>
		</PromptInput>

		<!-- Message History -->
		{#if messages.length > 0}
			<div class="bg-card space-y-2 rounded-lg border p-4">
				<p class="text-sm font-medium">Message History:</p>
				{#each messages as message, i}
					<div class="bg-muted rounded-md border p-3">
						<p class="text-sm font-medium">Message {i + 1}:</p>
						<p class="mt-1 text-sm">{message.text || "(no text)"}</p>
						{#if message.files.length > 0}
							<p class="text-muted-foreground mt-1 text-xs">
								{message.files.length} file(s) attached
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</PromptInputProvider>
</div>
