<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { onMount } from "svelte";
	import { watch } from "runed";
	import { InputGroup } from "$lib/components/ui/input-group/index.js";
	import {
		AttachmentsController,
		getOptionalPromptInputController,
		setLocalAttachmentsContext,
		type FileUIPart,
	} from "./prompt-input-context.svelte.js";
	import { convertBlobUrlToDataUrl } from "./utils.js";
	import type { PromptInputProps } from "./types.js";

	let {
		class: className,
		accept,
		multiple,
		globalDrop,
		syncHiddenInput,
		maxFiles,
		maxFileSize,
		onError,
		onSubmit,
		children,
		...props
	}: PromptInputProps = $props();

	// Try to use a provider controller if present
	const controller = getOptionalPromptInputController();
	const usingProvider = !!controller;

	// Refs
	let inputRef = $state<HTMLInputElement | null>(null);
	let anchorRef = $state<HTMLSpanElement | null>(null);
	let formRef = $state<HTMLFormElement | null>(null);

	// Local attachments (only used when no provider)
	const localAttachments = new AttachmentsController(
		accept,
		multiple,
		maxFiles,
		maxFileSize,
		onError
	);

	// Set local attachments context FIRST (before using it)
	if (!usingProvider) {
		setLocalAttachmentsContext(localAttachments);
	}

	// Get the attachments controller (provider or local)
	const attachments = usingProvider ? controller.attachments : localAttachments;

	// Find nearest form to scope drag & drop
	onMount(() => {
		const root = anchorRef?.closest("form");
		if (root instanceof HTMLFormElement) {
			formRef = root;
		}
	});

	// Let provider know about our hidden file input so external menus can call openFileDialog()
	$effect(() => {
		if (usingProvider && inputRef) {
			controller.__registerFileInput(inputRef, () => inputRef?.click());
		}
	});

	// Sync attachments controller's fileInputRef
	$effect(() => {
		attachments.fileInputRef = inputRef;
	});

	// Note: File input cannot be programmatically set for security reasons
	// The syncHiddenInput prop is no longer functional
	watch(
		() => attachments.files,
		() => {
			if (syncHiddenInput && inputRef && attachments.files.length === 0) {
				inputRef.value = "";
			}
		}
	);

	// Attach drop handlers on nearest form
	$effect(() => {
		const form = formRef;
		if (!form) return;

		const onDragOver = (e: DragEvent) => {
			if (e.dataTransfer?.types?.includes("Files")) {
				e.preventDefault();
			}
		};

		const onDrop = (e: DragEvent) => {
			if (e.dataTransfer?.types?.includes("Files")) {
				e.preventDefault();
			}
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
				attachments.add(e.dataTransfer.files);
			}
		};

		form.addEventListener("dragover", onDragOver);
		form.addEventListener("drop", onDrop);

		return () => {
			form.removeEventListener("dragover", onDragOver);
			form.removeEventListener("drop", onDrop);
		};
	});

	// Attach drop handlers on document (opt-in)
	$effect(() => {
		if (!globalDrop) return;

		const onDragOver = (e: DragEvent) => {
			if (e.dataTransfer?.types?.includes("Files")) {
				e.preventDefault();
			}
		};

		const onDrop = (e: DragEvent) => {
			if (e.dataTransfer?.types?.includes("Files")) {
				e.preventDefault();
			}
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
				attachments.add(e.dataTransfer.files);
			}
		};

		document.addEventListener("dragover", onDragOver);
		document.addEventListener("drop", onDrop);

		return () => {
			document.removeEventListener("dragover", onDragOver);
			document.removeEventListener("drop", onDrop);
		};
	});

	// Cleanup blob URLs on unmount (only if not using provider)
	$effect(() => {
		return () => {
			if (!usingProvider) {
				for (const f of attachments.files) {
					if (f.url) URL.revokeObjectURL(f.url);
				}
			}
		};
	});

	const handleChange = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		if (target.files) {
			attachments.add(target.files);
		}
	};

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const text = (formData.get("prompt-input") as string) || "";

		// Reset form BEFORE async conversion (prevents race condition)
		if (!usingProvider) {
			form.reset();
		}

		// Convert blob URLs to data URLs
		const convertedFiles = await Promise.all(
			attachments.files.map(async ({ id, ...item }) => {
				if (item.url?.startsWith("blob:")) {
					return { ...item, url: await convertBlobUrlToDataUrl(item.url) } as FileUIPart;
				}
				return item as FileUIPart;
			})
		);

		const message = { text, files: convertedFiles };

		try {
			const result = onSubmit(message, event);
			if (result instanceof Promise) {
				await result;
			}
			// Clear on success
			if (!usingProvider) {
				attachments.clear();
			}
		} catch (err) {
			// Don't clear on error
			console.error("Submit error:", err);
		}
	};
</script>

<!-- Hidden anchor for finding nearest form -->
<span bind:this={anchorRef} style="display: none;"></span>

<form onsubmit={handleSubmit} class={cn("w-full", className)} {...props}>
	<!-- Hidden file input -->
	<input
		bind:this={inputRef}
		type="file"
		name="prompt-input-files"
		{accept}
		{multiple}
		onchange={handleChange}
		style="display: none;"
		aria-hidden="true"
	/>

	<!-- InputGroup wrapper -->
	<InputGroup class="overflow-hidden">
		{#if children}
			{@render children()}
		{/if}
	</InputGroup>
</form>
