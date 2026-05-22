<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { getPrevNext } from "$lib/registry/components";
	import { Button } from "$lib/components/ui/button";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Kbd from "$lib/components/ui/kbd";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import {
		OpenIn,
		OpenInContent,
		OpenInSeparator,
		OpenInChatGPT,
		OpenInClaude,
		OpenInScira,
		OpenInT3
	} from "$lib/components/ui/open-in-chat";
	import { CopyMarkdown } from "$lib/components/ui/copy-markdown";
	import MarkdownIcon from "$lib/components/icons/markdown.svelte";
	import {
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		ExternalLink
	} from "@lucide/svelte";

	type NavLink = {
		name: string;
		href: string;
	} | null;

	interface Props {
		componentName: string;
		llmsTxtUrl: string;
		class?: string;
	}

	let { componentName, llmsTxtUrl, class: className }: Props = $props();

	// Create the query for AI assistants
	let query = $derived(
		`Read ${llmsTxtUrl} and help me understand ${componentName}`
	);

	let nav = $derived.by(() => {
		const pathname = page.url.pathname;
		const currentId = pathname.split("/").filter(Boolean).at(-1) ?? "";
		return {
			isSupported: true,
			...getPrevNext(currentId || "docs")
		};
	});

	function isTypingTarget(target: EventTarget | null) {
		if (!(target instanceof HTMLElement)) return false;
		if (target.isContentEditable) return true;

		const interactiveSelector =
			"input, textarea, select, [contenteditable='true']";
		return target.closest(interactiveSelector) !== null;
	}

	function navigateTo(link: NavLink) {
		if (!link) return;
		void goto(link.href);
	}

	function handleArrowNavigation(event: KeyboardEvent) {
		if (!nav.isSupported || event.defaultPrevented) return;
		if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
			return;
		if (isTypingTarget(event.target)) return;

		if (event.key === "ArrowLeft" && nav.prev) {
			event.preventDefault();
			navigateTo(nav.prev);
		}

		if (event.key === "ArrowRight" && nav.next) {
			event.preventDefault();
			navigateTo(nav.next);
		}
	}
</script>

<svelte:window onkeydown={handleArrowNavigation} />

<div class={["flex items-center gap-2", className].filter(Boolean).join(" ")}>
	<ButtonGroup.Root>
		<CopyMarkdown {llmsTxtUrl} />
		<OpenIn {query}>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="secondary"
						size="sm"
						class="px-2"
					>
						<ChevronDown class="size-4" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<OpenInContent align="end">
				<OpenInChatGPT />
				<OpenInClaude />
				<OpenInScira />
				<!-- <OpenInT3 /> -->
				<OpenInSeparator />
				<DropdownMenu.Item class="cursor-pointer gap-2">
					{#snippet child({ props })}
						<a
							href={llmsTxtUrl}
							target="_blank"
							rel="noopener"
							{...props}
						>
							<MarkdownIcon class="size-4" />
							<span class="flex-1">View as Markdown</span>
							<!-- <ExternalLink class="size-4" /> -->
						</a>
					{/snippet}
				</DropdownMenu.Item>
			</OpenInContent>
		</OpenIn>
	</ButtonGroup.Root>

	{#if nav.isSupported}
		<div class="ml-auto flex items-center gap-1">
			<Tooltip.Provider delayDuration={0}>
				{#if nav.prev}
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									href={nav.prev?.href}
									variant="secondary"
									size="icon-sm"
									aria-label={`Previous page: ${nav.prev?.name}`}
								>
									<ChevronLeft class="size-4" />
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content
							side="bottom"
							class="min-w-30 flex-col space-y-1 px-2! pt-1.5!"
						>
							<div class="text-sm font-medium">
								{nav.prev?.name}
							</div>
							<div
								class="flex items-center gap-2 text-xs text-background/80"
							>
								<span>Press</span>
								<Kbd.Root>&larr;</Kbd.Root>
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						variant="secondary"
						size="icon-sm"
						disabled
						aria-label="Previous page unavailable"
					>
						<ChevronLeft class="size-4" />
					</Button>
				{/if}

				{#if nav.next}
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									href={nav.next?.href}
									variant="secondary"
									size="icon-sm"
									aria-label={`Next page: ${nav.next?.name}`}
								>
									<ChevronRight class="size-4" />
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content
							side="bottom"
							class="min-w-32 flex-col space-y-1 px-2! pt-1.5!"
						>
							<div class="text-sm font-medium">
								{nav.next?.name}
							</div>
							<div
								class="flex items-center gap-2 text-xs text-background/80"
							>
								<span>Press</span>
								<Kbd.Root>&rarr;</Kbd.Root>
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						variant="secondary"
						size="icon-sm"
						disabled
						aria-label="Next page unavailable"
					>
						<ChevronRight class="size-4" />
					</Button>
				{/if}
			</Tooltip.Provider>
		</div>
	{/if}
</div>
