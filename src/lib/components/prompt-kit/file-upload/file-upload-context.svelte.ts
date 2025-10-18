export class FileUploadContext {
	isDragging = $state(false);
	inputRef = $state<HTMLInputElement | null>(null);
	multiple = $state<boolean>(true);
	disabled = $state<boolean>(false);

	constructor(multiple: boolean = true, disabled: boolean = false) {
		this.multiple = multiple;
		this.disabled = disabled;
	}
}
