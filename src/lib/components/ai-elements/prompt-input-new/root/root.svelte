<script lang="ts">
	import { untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { PromptInputRootController } from '../core/controllers.svelte.js';
	import {
		getOptionalProviderController,
		setAttachments,
		setController,
		setReferencedSources
	} from '../core/context.js';
	import type {
		PromptInputAttachment,
		PromptInputError,
		PromptInputFilesAddPayload,
		PromptInputFilesRemovePayload,
		PromptInputMessage
	} from '../core/types.js';
	import { sameAttachmentList } from '../core/utils.js';

	export type RootSubmitEvent = SubmitEvent & {
		currentTarget: EventTarget & HTMLFormElement;
	};

	export interface RootProps extends WithElementRef<
		Omit<HTMLFormAttributes, 'onsubmit' | 'onerror'>
	> {
		accept?: string;
		children?: Snippet;
		files?: PromptInputAttachment[];
		formClass?: string;
		globalDrop?: boolean;
		initialInput?: string;
		maxFiles?: number;
		maxFileSize?: number;
		multiple?: boolean;
		onError?: (error: PromptInputError) => void;
		onFilesAdd?: (payload: PromptInputFilesAddPayload) => void;
		onFilesRemove?: (payload: PromptInputFilesRemovePayload) => void;
		onSubmit: (message: PromptInputMessage, event: RootSubmitEvent) => void | Promise<void>;
		syncHiddenInput?: boolean;
	}

	let {
		ref = $bindable(null),
		class: className,
		accept,
		children,
		files = $bindable<PromptInputAttachment[] | undefined>(),
		formClass,
		globalDrop = false,
		initialInput = '',
		maxFiles,
		maxFileSize,
		multiple,
		onError,
		onFilesAdd,
		onFilesRemove,
		onSubmit,
		syncHiddenInput = false,
		...restProps
	}: RootProps = $props();

	const providerController = getOptionalProviderController();
	const controller = new PromptInputRootController({
		initialInput: untrack(() => initialInput),
		providerController
	});

	setController(controller);
	setAttachments(controller.attachments);
	setReferencedSources(controller.referencedSources);

	let fileInput = $state<HTMLInputElement | null>(null);

	$effect(() => {
		const validationOptions = {
			accept,
			maxFiles,
			maxFileSize,
			multiple,
			onError
		};

		untrack(() => {
			controller.setValidationOptions(validationOptions);
		});
	});

	$effect(() => {
		const input = fileInput;

		untrack(() => {
			controller.registerFileInput(input, () => input?.click());
		});
	});

	$effect(() => {
		const nextFiles = files;

		if (!nextFiles || sameAttachmentList(nextFiles, controller.attachments.files)) {
			return;
		}

		untrack(() => {
			controller.attachments.replaceFiles(nextFiles);
		});
	});

	$effect(() => {
		const handleFilesAdd = onFilesAdd;
		const handleFilesRemove = onFilesRemove;

		untrack(() => {
			controller.attachments.setCallbacks({
				onAdd(payload) {
					files = payload.allFiles;
					handleFilesAdd?.({
						...payload,
						allFiles: [...payload.allFiles],
						files: [...payload.files]
					});
				},
				onRemove(payload) {
					files = payload.allFiles;
					handleFilesRemove?.({
						...payload,
						allFiles: [...payload.allFiles],
						files: [...payload.files]
					});
				}
			});
		});
	});

	$effect(() => {
		const input = fileInput;
		const shouldReset = syncHiddenInput && input && controller.attachments.files.length === 0;

		if (shouldReset && input) {
			untrack(() => {
				input.value = '';
			});
		}
	});

	$effect(() => {
		return () => controller.destroy();
	});

	$effect(() => {
		if (!globalDrop || typeof document === 'undefined') {
			return;
		}

		const onDragOver = (event: DragEvent) => {
			if (event.dataTransfer?.types.includes('Files')) {
				event.preventDefault();
			}
		};

		const onDrop = (event: DragEvent) => {
			if (event.dataTransfer?.types.includes('Files')) {
				event.preventDefault();
			}

			if (event.dataTransfer?.files?.length) {
				controller.attachments.add(event.dataTransfer.files, 'drop');
			}
		};

		document.addEventListener('dragover', onDragOver);
		document.addEventListener('drop', onDrop);

		return () => {
			document.removeEventListener('dragover', onDragOver);
			document.removeEventListener('drop', onDrop);
		};
	});

	function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;

		if (input.files?.length) {
			controller.attachments.add(input.files, 'picker');
		}

		input.value = '';
	}

	function handleLocalDragOver(event: DragEvent) {
		if (event.dataTransfer?.types.includes('Files')) {
			event.preventDefault();
		}
	}

	function handleLocalDrop(event: DragEvent) {
		if (event.dataTransfer?.types.includes('Files')) {
			event.preventDefault();
		}

		if (event.dataTransfer?.files?.length) {
			controller.attachments.add(event.dataTransfer.files, 'drop');
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		try {
			const message = await controller.createMessage();
			await onSubmit(message, event as RootSubmitEvent);
			controller.clear('submit-clear');
		} catch {
			// Keep the current state intact so the user can retry.
		}
	}
</script>

<input
	bind:this={fileInput}
	{accept}
	aria-label="Upload files"
	class="hidden"
	{multiple}
	onchange={handleFileChange}
	title="Upload files"
	type="file"
/>

<form
	bind:this={ref}
	class={cn('w-full', formClass)}
	ondragover={!globalDrop ? handleLocalDragOver : undefined}
	ondrop={!globalDrop ? handleLocalDrop : undefined}
	onsubmit={handleSubmit}
	{...restProps}
>
	<InputGroup.Root class={cn('overflow-hidden pt-1', className)}>
		{@render children?.()}
	</InputGroup.Root>
</form>
