<script lang="ts">
	import type { ComponentProps } from "svelte";
	import * as InputGroup from "$lib/components/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import {
		getAttachments,
		getController,
	} from "../core/context.js";

	export type TextareaProps = Omit<
		ComponentProps<typeof InputGroup.Textarea>,
		"name" | "value" | "oninput"
	>;

	let {
		class: className,
		oncompositionend,
		oncompositionstart,
		onkeydown,
		onpaste,
		placeholder = "What would you like to know?",
		...restProps
	}: TextareaProps = $props();

	const controller = getController();
	const attachments = getAttachments();

	let isComposing = $state(false);

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLTextAreaElement;
		controller.textInput.setInput(target.value);
	}

	function handleKeyDown(event: KeyboardEvent) {
		onkeydown?.(event as KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement });
		if (event.defaultPrevented) {
			return;
		}

		const textarea = event.currentTarget as HTMLTextAreaElement;

		if (event.key === "Enter") {
			if (isComposing || event.isComposing || event.shiftKey) {
				return;
			}

			event.preventDefault();

			const submitButton = textarea.form?.querySelector(
				'button[type="submit"]',
			) as HTMLButtonElement | null;

			if (submitButton?.disabled) {
				return;
			}

			textarea.form?.requestSubmit();
			return;
		}

		if (event.key === "Backspace" && textarea.value === "" && attachments.files.length > 0) {
			event.preventDefault();
			const lastAttachment = attachments.files.at(-1);
			if (lastAttachment) {
				attachments.remove(lastAttachment.id, "backspace");
			}
		}
	}

	function handlePaste(event: ClipboardEvent) {
		onpaste?.(event as ClipboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement });
		if (event.defaultPrevented) {
			return;
		}

		const files: File[] = [];
		for (const item of event.clipboardData?.items ?? []) {
			if (item.kind === "file") {
				const file = item.getAsFile();
				if (file) {
					files.push(file);
				}
			}
		}

		if (files.length > 0) {
			event.preventDefault();
			attachments.add(files, "paste");
		}
	}

	function handleCompositionStart(event: CompositionEvent) {
		isComposing = true;
		oncompositionstart?.(
			event as CompositionEvent & { currentTarget: EventTarget & HTMLTextAreaElement },
		);
	}

	function handleCompositionEnd(event: CompositionEvent) {
		isComposing = false;
		oncompositionend?.(
			event as CompositionEvent & { currentTarget: EventTarget & HTMLTextAreaElement },
		);
	}
</script>

<InputGroup.Textarea
	class={cn("field-sizing-content max-h-48 min-h-16", className)}
	name="message"
	oncompositionend={handleCompositionEnd}
	oncompositionstart={handleCompositionStart}
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onpaste={handlePaste}
	placeholder={placeholder}
	value={controller.textInput.value}
	{...restProps}
/>
