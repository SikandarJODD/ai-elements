<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { Mic, MicOff } from "@lucide/svelte/icons";
	import { getOptionalPromptInputController } from "./prompt-input-context.svelte.js";
	import PromptInputButton from "./PromptInputButton.svelte";
	import type { PromptInputSpeechButtonProps } from "./types.js";

	let { class: className, textareaRef, ...props }: PromptInputSpeechButtonProps = $props();

	const controller = getOptionalPromptInputController();

	let isRecording = $state(false);
	let recognition = $state<SpeechRecognition | null>(null);

	// Initialize Web Speech API
	$effect(() => {
		if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
			const SpeechRecognition =
				window.SpeechRecognition || (window as any).webkitSpeechRecognition;
			recognition = new SpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = "en-US";

			recognition.onresult = (event: SpeechRecognitionEvent) => {
				let transcript = "";
				for (let i = event.resultIndex; i < event.results.length; i++) {
					transcript += event.results[i][0].transcript;
				}

				// Update textarea value
				if (controller) {
					controller.textInput.value = transcript;
				} else if (textareaRef) {
					textareaRef.value = transcript;
					// Trigger input event to sync with bind:value
					textareaRef.dispatchEvent(new Event("input", { bubbles: true }));
				}
			};

			recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
				console.error("Speech recognition error:", event.error);
				isRecording = false;
			};

			recognition.onend = () => {
				isRecording = false;
			};
		}

		return () => {
			if (recognition) {
				recognition.stop();
			}
		};
	});

	const toggleRecording = () => {
		if (!recognition) {
			alert("Speech recognition is not supported in this browser.");
			return;
		}

		if (isRecording) {
			recognition.stop();
			isRecording = false;
		} else {
			recognition.start();
			isRecording = true;
		}
	};
</script>

<PromptInputButton
	class={cn(isRecording && "text-destructive", className)}
	onclick={toggleRecording}
	type="button"
	aria-label={isRecording ? "Stop recording" : "Start recording"}
	{...props}
>
	{#if isRecording}
		<MicOff class="size-4" />
	{:else}
		<Mic class="size-4" />
	{/if}
</PromptInputButton>
