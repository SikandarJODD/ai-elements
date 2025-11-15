<script lang="ts">
	import { Image } from "@lucide/svelte/icons";
	import { getPromptInputAttachments } from "./prompt-input-context.svelte.js";
	import PromptInputActionMenuItem from "./PromptInputActionMenuItem.svelte";

	interface Props {
		label?: string;
		class?: string;
	}

	let { label = "Add photos or files", class: className, ...props }: Props = $props();

	const attachments = getPromptInputAttachments();

	const handleSelect = (e: Event) => {
		e.preventDefault();
		attachments.openFileDialog();
	};
</script>

<PromptInputActionMenuItem class={className} onSelect={handleSelect} {...props}>
	<Image class="mr-2 size-4" />
	{label}
</PromptInputActionMenuItem>
