<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import HoverCardTrigger from "$lib/components/ui/hover-card/hover-card-trigger.svelte";
	import { getSourceContext } from "./source-context.svelte.js";

	interface Props {
		label?: string | number;
		showFavicon?: boolean;
		class?: string;
		[key: string]: any;
	}

	let { label, showFavicon = false, class: className, ...restProps }: Props = $props();

	const { href, domain } = getSourceContext();

	let labelToShow = $derived(label ?? domain.replace("www.", ""));
	let faviconUrl = $derived(
		`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(href)}`
	);
</script>

<HoverCardTrigger>
	<a
		{...restProps}
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class={cn(
			"bg-muted text-muted-foreground hover:bg-muted-foreground/30 hover:text-primary inline-flex h-5 max-w-32 items-center gap-1 overflow-hidden rounded-full py-0 text-xs leading-none no-underline transition-colors duration-150",
			showFavicon ? "pr-2 pl-1" : "px-1",
			className
		)}
	>
		{#if showFavicon}
			<img
				src={faviconUrl}
				alt="favicon"
				width="14"
				height="14"
				class="size-3.5 rounded-full"
			/>
		{/if}
		<span class="truncate text-center font-normal">{labelToShow}</span>
	</a>
</HoverCardTrigger>
