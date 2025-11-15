<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputSpeechButton,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let textareaRef = $state<HTMLTextAreaElement | null>(null);
	let lastMessage = $state<string>("");

	const handleSubmit = (message: PromptInputMessage) => {
		lastMessage = message.text;
		console.log("Speech input submitted:", message.text);
		status = "submitted";

		setTimeout(() => {
			status = "ready";
		}, 1000);
	};
</script>

<div class="mx-auto w-full max-w-2xl space-y-4">
	<div class="bg-card rounded-lg border p-4">
		<h3 class="mb-2 font-semibold">Web Speech API Demo</h3>
		<p class="text-muted-foreground text-sm">
			Click the microphone button to start voice input. Speak clearly and your words will
			appear in the textarea.
		</p>
	</div>

	<PromptInput onSubmit={handleSubmit}>
		<PromptInputBody>
			<PromptInputTextarea
				bind:ref={textareaRef}
				placeholder="Click the mic and start speaking..."
			/>
		</PromptInputBody>

		<PromptInputFooter>
			<PromptInputTools>
				<PromptInputSpeechButton {textareaRef} />
			</PromptInputTools>

			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>

	{#if lastMessage}
		<div class="bg-muted rounded-lg border p-4">
			<p class="text-sm font-medium">Last submitted message:</p>
			<p class="mt-2 text-sm">{lastMessage}</p>
		</div>
	{/if}
</div>
