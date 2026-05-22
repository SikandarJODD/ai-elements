<script lang="ts">
	import { cn } from "$lib/utils";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { getAttachmentsContext } from "../context/attachments.svelte.js";
	import { getPromptInputProvider } from "../context/provider.svelte.js";
	import { getPromptInputTextRegistration } from "../context/text-registration.svelte.js";

	interface Props {
		ref?: HTMLTextAreaElement | null;
		class?: string;
		placeholder?: string;
		value?: string;
		onchange?: (event: Event) => void;
	}

	let {
		ref = $bindable(null),
		class: className,
		placeholder = "What would you like to know?",
		value = $bindable(""),
		onchange,
		...props
	}: Props = $props();

	let attachments = getAttachmentsContext();
	let controller = getPromptInputProvider();
	let promptTextRegistration = getPromptInputTextRegistration();

	let promptTextHandle = {
		getValue: () => (controller ? controller.textInput.value : value),
		clear: () => {
			value = "";
		},
	};

	$effect(() => {
		promptTextRegistration.register(promptTextHandle);

		return () => {
			promptTextRegistration.unregister(promptTextHandle);
		};
	});

	$effect(() => {
		if (controller && value !== controller.textInput.value) {
			value = controller.textInput.value;
		}
	});

	let handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			// Don't submit if IME composition is in progress
			if (e.isComposing) {
				return;
			}

			if (e.shiftKey) {
				// Allow newline
				return;
			}

			// Submit on Enter (without Shift)
			e.preventDefault();
			let form = (e.currentTarget as HTMLTextAreaElement).form;
			if (form) {
				let promptInputSubmit = form.querySelector(
					"[data-prompt-input-submit]"
				) as HTMLButtonElement | null;
				if (promptInputSubmit) {
					if (promptInputSubmit.disabled || promptInputSubmit.type !== "submit") {
						return;
					}

					form.requestSubmit(promptInputSubmit);
					return;
				}

				let submitButton = form.querySelector(
					'button[type="submit"]'
				) as HTMLButtonElement | null;
				if (submitButton?.disabled) {
					return;
				}

				if (submitButton) {
					form.requestSubmit(submitButton);
					return;
				}

				form.requestSubmit();
			}
		}
	};

	let handleInput = (event: Event) => {
		let nextValue = (event.currentTarget as HTMLTextAreaElement).value;
		value = nextValue;
		controller?.textInput.setInput(nextValue);
	};

	let handlePaste = (e: ClipboardEvent) => {
		let items = e.clipboardData?.items;

		if (!items) {
			return;
		}

		let files: File[] = [];

		for (let item of items) {
			if (item.kind === "file") {
				let file = item.getAsFile();
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
</script>

{#if controller}
	<Textarea
		bind:ref
		class={cn(
			"w-full resize-none rounded-none border-none p-3 shadow-none ring-0 outline-none",
			"field-sizing-content bg-transparent dark:bg-transparent",
			"max-h-48 min-h-10",
			"focus-visible:ring-0",
			className
		)}
		oninput={handleInput}
		onpaste={handlePaste}
		name="message"
		{onchange}
		onkeydown={handleKeyDown}
		{placeholder}
		value={controller.textInput.value}
		{...props}
	/>
{:else}
	<Textarea
		bind:ref
		class={cn(
			"w-full resize-none rounded-none border-none p-3 shadow-none ring-0 outline-none",
			"field-sizing-content bg-transparent dark:bg-transparent",
			"max-h-48 min-h-10",
			"focus-visible:ring-0",
			className
		)}
		oninput={handleInput}
		onpaste={handlePaste}
		name="message"
		{onchange}
		onkeydown={handleKeyDown}
		{placeholder}
		bind:value
		{...props}
	/>
{/if}
