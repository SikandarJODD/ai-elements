<script lang="ts">
	import { getAttachmentsContext } from "./attachments-context.svelte.js";
	import PromptInputActionMenuItem from "./PromptInputActionMenuItem.svelte";
	import ImageIcon from "./ImageIcon.svelte";

	interface Props {
		label?: string;
		class?: string;
	}

	let { label = "Add photos or files", class: className, ...props }: Props = $props();

	let attachments = getAttachmentsContext();

	let handleSelect = (e: Event) => {
		e.preventDefault();
		attachments.openFileDialog();
	};
</script>

<PromptInputActionMenuItem class={className} onSelect={handleSelect} {...props}>
	<ImageIcon class="mr-2 size-4" />
	{label}
</PromptInputActionMenuItem>
