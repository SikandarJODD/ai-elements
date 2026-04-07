	<script lang="ts">
	import { getAttachmentsContext } from "../context/attachments.svelte.js";
	import ActionMenuItem from "./ActionMenuItem.svelte";
	import ImageIcon from "../icons/ImageIcon.svelte";

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

<ActionMenuItem class={className} onSelect={handleSelect} {...props}>
	<ImageIcon class="mr-2 size-4" />
	{label}
</ActionMenuItem>
