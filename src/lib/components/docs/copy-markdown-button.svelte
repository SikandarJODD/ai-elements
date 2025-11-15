<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Check, Copy } from "@lucide/svelte";
	import { toast } from "svelte-sonner";

	interface Props {
		llmsTxtUrl: string;
		component?: string;
		registry?: string;
		source?: string;
	}

	let { llmsTxtUrl, component, registry, source = "documentation" }: Props = $props();

	let copied = $state(false);

	async function copyMarkdown() {
		try {
			const response = await fetch(llmsTxtUrl);
			if (!response.ok) throw new Error("Failed to fetch markdown content");

			const markdown = await response.text();
			await navigator.clipboard.writeText(markdown);

			copied = true;
			toast.success("Copied to clipboard!");

			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error("Failed to copy markdown:", error);
			toast.error("Failed to copy markdown");
		}
	}
</script>

<Button
	variant="secondary"
	size="lg"
	onclick={copyMarkdown}
	class="gap-2"
	aria-label="Copy as Markdown"
	data-s-event={"copy_markdown"}
	data-s-event-path={`/${registry}/${component}`}
	data-s-event-props={component && registry && source
		? `component=${component};registry=${registry};source=${source}`
		: undefined}
>
	{#if copied}
		<Check class="size-4" />
	{:else}
		<Copy class="size-4" />
	{/if}
	<span>Copy Markdown</span>
</Button>
