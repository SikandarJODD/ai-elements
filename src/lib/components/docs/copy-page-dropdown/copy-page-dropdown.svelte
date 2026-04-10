<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {
		OpenIn,
		OpenInContent,
		OpenInLabel,
		OpenInSeparator,
		OpenInChatGPT,
		OpenInClaude,
		OpenInScira,
		OpenInT3,
	} from "$lib/components/ai-elements/open-in-chat";
	import { CopyMarkdown } from "$lib/components/ui/copy-markdown";
	import MarkdownIcon from "$lib/components/icons/markdown.svelte";
	import { ChevronDown, ExternalLink } from "@lucide/svelte";

	interface Props {
		componentName: string;
		llmsTxtUrl: string;
		class?: string;
	}

	let { componentName, llmsTxtUrl, class: className }: Props = $props();

	// Create the query for AI assistants
	let query = $derived(
		`Read ${llmsTxtUrl} and help me understand the ${componentName} component`
	);
</script>

<ButtonGroup.Root class={className}>
	<CopyMarkdown {llmsTxtUrl} />
	<ButtonGroup.Separator />
	<OpenIn {query}>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="secondary" size="sm" class="px-2">
					<ChevronDown class="size-4" />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<OpenInContent align="end">
			<!-- <OpenInLabel class="font-normal!">Open In</OpenInLabel> -->
			<DropdownMenu.Item class="gap-2">
				<a
					href={llmsTxtUrl}
					target="_blank"
					rel="noopener"
					class="flex w-full items-center gap-2"
				>
					<MarkdownIcon class="size-4" />
					<span class="flex-1">Open as Markdown</span>
					<ExternalLink class="size-4" />
				</a>
			</DropdownMenu.Item>
			<OpenInChatGPT />
			<OpenInScira />
			<OpenInClaude />
			<OpenInT3 />
			<!-- <OpenInSeparator /> -->
		</OpenInContent>
	</OpenIn>
</ButtonGroup.Root>
