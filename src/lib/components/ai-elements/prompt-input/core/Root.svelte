<script lang="ts">
	import type { FileUIPart } from "ai";
	import { cn } from "$lib/utils";
	import { watch } from "runed";
	import { onDestroy } from "svelte";
	import { AttachmentsContext, setAttachmentsContext } from "../context/attachments.svelte.js";
	import { getPromptInputProvider } from "../context/provider.svelte.js";
	import {
		setPromptInputTextRegistration,
		type PromptInputTextHandle,
	} from "../context/text-registration.svelte.js";
	import type { Message, PromptInputAttachment } from "../context/types.js";

	interface Props {
		class?: string;
		attachments?: PromptInputAttachment[];
		accept?: string;
		multiple?: boolean;
		globalDrop?: boolean;
		syncHiddenInput?: boolean;
		clearOnSubmit?: boolean;
		resetFormOnSubmit?: boolean;
		maxFiles?: number;
		maxFileSize?: number; // bytes
		onError?: (err: {
			code: "max_files" | "max_file_size" | "accept";
			message: string;
		}) => void;
		onFileAdd?: (added: PromptInputAttachment[], attachments: PromptInputAttachment[]) => void;
		onFileRemove?: (
			removed: PromptInputAttachment[],
			attachments: PromptInputAttachment[]
		) => void;
		onSubmit: (message: Message, event: SubmitEvent) => void | Promise<void>;
		children?: import("svelte").Snippet;
	}

	let {
		class: className,
		attachments = $bindable<PromptInputAttachment[] | undefined>(undefined),
		accept,
		multiple,
		globalDrop,
		syncHiddenInput,
		clearOnSubmit = true,
		resetFormOnSubmit = false,
		maxFiles,
		maxFileSize,
		onError,
		onFileAdd,
		onFileRemove,
		onSubmit,
		children,
		...props
	}: Props = $props();

	let formRef = $state<HTMLFormElement | null>(null);
	let controller = getPromptInputProvider();
	let usingProvider = Boolean(controller);
	let localAttachmentsContext = new AttachmentsContext();
	let attachmentsContext = controller?.attachments ?? localAttachmentsContext;
	let promptTextHandle = $state<PromptInputTextHandle | null>(null);

	setPromptInputTextRegistration({
		register: (handle) => {
			promptTextHandle = handle;
		},
		unregister: (handle) => {
			if (promptTextHandle === handle) {
				promptTextHandle = null;
			}
		},
	});

	$effect(() => {
		attachmentsContext.configure({
			accept,
			multiple,
			maxFiles,
			maxFileSize,
			onError,
			onFileAdd,
			onFileRemove,
		});
	});

	$effect(() => {
		let syncAttachments = (next: PromptInputAttachment[]) => {
			if (attachments !== next) {
				attachments = next;
			}
		};

		attachmentsContext.onAttachmentsChange = syncAttachments;
		syncAttachments(attachmentsContext.attachments);

		return () => {
			if (attachmentsContext.onAttachmentsChange === syncAttachments) {
				attachmentsContext.onAttachmentsChange = undefined;
			}
		};
	});

	$effect(() => {
		if (attachments !== undefined && attachmentsContext.attachments !== attachments) {
			attachmentsContext.replace(attachments);
		}
	});

	// Attach drop handlers on nearest form
	watch(
		() => formRef,
		(formRef) => {
			if (!formRef) return;

			let onDragOver = (e: DragEvent) => {
				if (e.dataTransfer?.types?.includes("Files")) {
					e.preventDefault();
				}
			};

			let onDrop = (e: DragEvent) => {
				if (e.dataTransfer?.types?.includes("Files")) {
					e.preventDefault();
				}
				if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
					attachmentsContext.add(e.dataTransfer.files);
				}
			};

			formRef.addEventListener("dragover", onDragOver);
			formRef.addEventListener("drop", onDrop);

			return () => {
				formRef?.removeEventListener("dragover", onDragOver);
				formRef?.removeEventListener("drop", onDrop);
			};
		}
	);

	// Global drop handlers
	watch(
		() => globalDrop,
		(globalDrop) => {
			if (!globalDrop) return;

			let onDragOver = (e: DragEvent) => {
				if (e.dataTransfer?.types?.includes("Files")) {
					e.preventDefault();
				}
			};

			let onDrop = (e: DragEvent) => {
				if (e.dataTransfer?.types?.includes("Files")) {
					e.preventDefault();
				}
				if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
					attachmentsContext.add(e.dataTransfer.files);
				}
			};

			document.addEventListener("dragover", onDragOver);
			document.addEventListener("drop", onDrop);

			return () => {
				document.removeEventListener("dragover", onDragOver);
				document.removeEventListener("drop", onDrop);
			};
		}
	);

	// Note: File input cannot be programmatically set for security reasons
	// The syncHiddenInput prop is no longer functional
	watch(
		() => attachmentsContext.attachments,
		() => {
			if (syncHiddenInput && attachmentsContext.fileInputRef) {
				// Clear the input when items are cleared
				if (attachmentsContext.attachments.length === 0) {
					attachmentsContext.fileInputRef.value = "";
				}
			}
		}
	);

	let handleChange = (event: Event) => {
		let target = event.currentTarget as HTMLInputElement;
		if (target.files) {
			attachmentsContext.add(target.files);
		}
		target.value = "";
	};

	let convertFileToDataUrl = (file: File): Promise<string> =>
		new Promise((resolve, reject) => {
			let reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = () => reject(reader.error ?? new Error("Failed to read file."));
			reader.readAsDataURL(file);
		});

	let createFiles = async (
		attachments: PromptInputAttachment[]
	): Promise<FileUIPart[] | undefined> => {
		if (attachments.length === 0) {
			return undefined;
		}

		let files = await Promise.all(
			attachments.map(async (attachment) => {
				let url = attachment.remoteUrl
					? attachment.remoteUrl
					: await convertFileToDataUrl(attachment.file);

				return {
					type: "file" as const,
					url,
					mediaType:
						attachment.mediaType || attachment.file.type || "application/octet-stream",
					filename: attachment.filename || attachment.file.name,
				};
			})
		);

		return files.length > 0 ? files : undefined;
	};

	let handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		let form = event.currentTarget as HTMLFormElement;
		let text = usingProvider
			? (controller?.textInput.value ?? "")
			: (promptTextHandle?.getValue() ??
				((new FormData(form).get("message") as string) || ""));
		let submittedAttachments = attachmentsContext.attachments.map((attachment) => ({
			...attachment,
		}));
		let files = await createFiles(attachmentsContext.attachments);

		try {
			let result = onSubmit(
				{
					text,
					files,
					attachments: submittedAttachments,
				},
				event
			);

			// Handle both sync and async onSubmit
			if (result && typeof result === "object" && "then" in result) {
				await result;
			}

			// Only clear if submission was successful
			if (clearOnSubmit) {
				attachmentsContext.clear();
				if (usingProvider) {
					controller?.textInput.clear();
				} else {
					promptTextHandle?.clear();
				}

				if (resetFormOnSubmit) {
					form.reset();
				}
			}
		} catch (error) {
			// Don't clear on error - user may want to retry
			console.error("Submit failed:", error);
		}
	};

	onDestroy(() => {
		if (usingProvider) {
			attachmentsContext.onAttachmentsChange = undefined;
			attachmentsContext.onFileAdd = undefined;
			attachmentsContext.onFileRemove = undefined;
			attachmentsContext.onError = undefined;
			if (attachmentsContext.fileInputRef) {
				attachmentsContext.fileInputRef = null;
			}
			return;
		}

		localAttachmentsContext.destroy();
	});

	setAttachmentsContext(attachmentsContext);
</script>

<input
	{accept}
	class="hidden"
	{multiple}
	onchange={handleChange}
	bind:this={attachmentsContext.fileInputRef}
	type="file"
/>
<form
	bind:this={formRef}
	class={cn("bg-background w-full overflow-hidden rounded-xl border shadow-sm", className)}
	onsubmit={handleSubmit}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</form>
