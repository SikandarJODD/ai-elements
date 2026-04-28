<script lang="ts">
	import { recipes } from "$lib/config/cookbook-data";
	import { Button } from "$lib/components/ui/button";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {
		OpenIn,
		OpenInContent,
		OpenInSeparator,
		OpenInChatGPT,
		OpenInClaude,
		OpenInScira,
		OpenInT3,
		GitHubIcon,
	} from "$lib/components/ai-elements/open-in-chat";
	import { CopyMarkdown } from "$lib/components/ui/copy-markdown";
	import MarkdownIcon from "$lib/components/icons/markdown.svelte";
	import { ChevronDown, ExternalLink } from "@lucide/svelte";
	import {
		getAiElementsGithubUrl,
		getCookbookGithubUrl,
		getPromptKitGithubUrl,
	} from "$lib/config/github-paths";
	import { cn } from "$lib/utils";

	interface Props {
		componentName: string;
		llmsTxtUrl: string;
		class?: string;
		type: "prompt-kit" | "ai-elements" | "cookbook";
	}

	let { componentName, llmsTxtUrl, class: className, type }: Props = $props();

	// Create the query for AI assistants
	let query = $derived(
		`Read ${llmsTxtUrl} and help me understand the ${componentName} component`
	);

	function toSlug(value: string): string {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "");
	}

	function getGithubUrl(): string {
		const fallback = `https://github.com/search?type=code&q=${encodeURIComponent(componentName)}`;
		if (type === "cookbook") {
			return getCookbookGithubUrl(componentName) || fallback;
		}
		if (type === "ai-elements") {
			return getAiElementsGithubUrl(componentName) || fallback;
		}
		return getPromptKitGithubUrl(componentName) || fallback;
	}

	let githubUrl = $derived(getGithubUrl());

	function getPlaygroundUrl(): string | undefined {
		if (type !== "cookbook") return undefined;

		const componentSlug = toSlug(componentName);
		return recipes.find((recipe) => recipe.slug === componentSlug)?.playground_url;
	}

	let playgroundUrl = $derived(getPlaygroundUrl());
</script>

<div class={cn("flex items-center gap-2", className)}>
	{#if playgroundUrl}
		<Button href={playgroundUrl} variant="outline" size="sm" rel="noreferrer" class="shrink-0">
			Visit Playground
		</Button>
	{/if}

	<ButtonGroup.Root>
		<CopyMarkdown {llmsTxtUrl} />
		<OpenIn {query}>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="secondary" size="sm" class="px-2">
						<ChevronDown class="size-4" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<OpenInContent align="end" preventScroll={false}>
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
				<OpenInSeparator />
				<DropdownMenu.Item class="w-full">
					<a
						href={githubUrl}
						rel="noopener"
						target="_blank"
						class="flex w-full items-center gap-2"
					>
						<span class="shrink-0">
							<GitHubIcon size="1em" />
						</span>
						<span class="flex-1">Open in GitHub</span>
						<ExternalLink class="size-4 shrink-0" />
					</a>
				</DropdownMenu.Item>
			</OpenInContent>
		</OpenIn>
	</ButtonGroup.Root>
</div>
