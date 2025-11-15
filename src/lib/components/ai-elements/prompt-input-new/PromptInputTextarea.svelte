<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { watch } from "runed";
	import { InputGroupTextarea } from "$lib/components/ui/input-group/index.js";
	import {
		getPromptInputAttachments,
		getOptionalPromptInputController,
	} from "./prompt-input-context.svelte.js";
	import type { PromptInputTextareaProps } from "./types.js";

	let {
		class: className,
		placeholder = "What would you like to know?",
		value = $bindable(""),
		ref = $bindable(null),
		...props
	}: PromptInputTextareaProps = $props();

	// Get attachments context (dual-mode: provider or local)
	const attachments = getPromptInputAttachments();

	// Get optional controller for syncing text input
	const controller = getOptionalPromptInputController();

	// Refs
	let textareaRef = $state<HTMLTextAreaElement | null>(null);
	let isComposing = $state(false);

	// Sync internal ref with external bindable ref
	$effect(() => {
		ref = textareaRef;
	});

	// Sync with controller if using provider
	watch(
		() => value,
		(newValue) => {
			if (controller) {
				controller.textInput.value = newValue;
			}
		}
	);

	// Sync from controller to local value
	watch(
		() => controller?.textInput.value,
		(newValue) => {
			if (controller && newValue !== undefined && newValue !== value) {
				value = newValue;
			}
		}
	);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			// Don't submit if IME composition is in progress
			if (isComposing || e.isComposing) {
				return;
			}

			if (e.shiftKey) {
				// Allow newline
				return;
			}

			// Submit on Enter (without Shift)
			e.preventDefault();

			// Check if submit button is disabled
			const form = (e.currentTarget as HTMLTextAreaElement).form;
			const submitButton = form?.querySelector('button[type="submit"]');
			if (submitButton instanceof HTMLButtonElement && submitButton.disabled) {
				return;
			}

			form?.requestSubmit();
		}

		// Backspace to remove last attachment when textarea is empty
		if (e.key === "Backspace" && !value) {
			const files = attachments.files;
			if (files.length > 0) {
				e.preventDefault();
				attachments.remove(files[files.length - 1].id);
			}
		}
	};

	const handlePaste = (e: ClipboardEvent) => {
		const items = e.clipboardData?.items;

		if (!items) {
			return;
		}

		const files: File[] = [];

		for (const item of items) {
			if (item.kind === "file") {
				const file = item.getAsFile();
				if (file) {
					files.push(file);
				}
			}
		}

		if (files.length > 0) {
			e.preventDefault();
			attachments.add(files);
		}
	};

	const handleCompositionStart = () => {
		isComposing = true;
	};

	const handleCompositionEnd = () => {
		isComposing = false;
	};
</script>

<InputGroupTextarea
	bind:ref={textareaRef}
	bind:value
	name="prompt-input"
	class={cn("field-sizing-content max-h-48 min-h-16", "focus-visible:ring-0", className)}
	{placeholder}
	onkeydown={handleKeyDown}
	onpaste={handlePaste}
	oncompositionstart={handleCompositionStart}
	oncompositionend={handleCompositionEnd}
	{...props}
/>
