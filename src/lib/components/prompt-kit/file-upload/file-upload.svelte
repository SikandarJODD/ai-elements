<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import { FileUploadContext } from "./file-upload-context.svelte";

	type Props = {
		onFilesAdded: (files: File[]) => void;
		children: Snippet;
		multiple?: boolean;
		accept?: string;
		disabled?: boolean;
	};

	let { onFilesAdded, children, multiple = true, accept, disabled = false }: Props = $props();

	const ctx = new FileUploadContext(multiple, disabled);
	setContext("file-upload", ctx);

	let dragCounter = 0;

	function handleFiles(files: FileList) {
		const newFiles = Array.from(files);
		if (multiple) {
			onFilesAdded(newFiles);
		} else {
			onFilesAdded(newFiles.slice(0, 1));
		}
	}

	function handleDrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDragIn(e: DragEvent) {
		handleDrag(e);
		dragCounter++;
		if (e.dataTransfer?.items.length) {
			ctx.isDragging = true;
		}
	}

	function handleDragOut(e: DragEvent) {
		handleDrag(e);
		dragCounter--;
		if (dragCounter === 0) {
			ctx.isDragging = false;
		}
	}

	function handleDrop(e: DragEvent) {
		handleDrag(e);
		ctx.isDragging = false;
		dragCounter = 0;
		if (e.dataTransfer?.files.length) {
			handleFiles(e.dataTransfer.files);
		}
	}

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files?.length) {
			handleFiles(target.files);
			target.value = "";
		}
	}
</script>

<svelte:window
	ondragenter={handleDragIn}
	ondragleave={handleDragOut}
	ondragover={handleDrag}
	ondrop={handleDrop}
/>

<input
	type="file"
	bind:this={ctx.inputRef}
	onchange={handleFileSelect}
	class="hidden"
	{multiple}
	{accept}
	aria-hidden="true"
	{disabled}
/>

{@render children()}
