<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { getOpenInContext, providers } from "./open-in-context.svelte.js";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import ChatGPTIcon from "./ChatGPTIcon.svelte";

	interface Props {
		class?: string;
	}

	let { ...restProps }: Props = $props();

	let context = getOpenInContext();

	let url = $derived.by(() => providers.chatgpt.createUrl(context.query));
</script>

<DropdownMenu.Item {...restProps} class="w-full cursor-pointer">
	{#snippet child({ props })}
		<a href={url} rel="noopener" target="_blank" {...props}>
			<span class="shrink-0">
				<ChatGPTIcon size="1em" class="text-muted-foreground" />
			</span>
			<span class="flex-1">{providers.chatgpt.title}</span>
			<!-- <ExternalLink class="size-4 shrink-0" /> -->
		</a>
	{/snippet}
</DropdownMenu.Item>
