<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		OpenIn,
		OpenInTrigger,
		OpenInContent,
		OpenInChatGPT,
		OpenInClaude,
		OpenInT3,
		OpenInScira,
		GitHubIcon,
	} from "$lib/components/ai-elements/open-in-chat";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { ChevronDown, ExternalLink } from "@lucide/svelte";
	import {
		getPromptKitGithubUrl,
		getAiElementsGithubUrl,
		getCookbookGithubUrl,
	} from "$lib/config/github-paths";
	import { Markdown } from "$lib/components/icons";

	interface Props {
		componentName: string;
		llmsTxtUrl: string;
		type?: "prompt-kit" | "ai-elements" | "cookbook";
	}

	let { componentName, llmsTxtUrl, type = "prompt-kit" }: Props = $props();

	// Create the query for AI assistants
	const query = `Read ${llmsTxtUrl} and help me understand the ${componentName} component`;

	// Get the exact GitHub file URL for the component based on type
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

	const githubUrl = getGithubUrl();
</script>

<OpenIn {query}>
	<OpenInTrigger>
		<Button variant="secondary" size="lg" class="gap-2">
			<span>Open</span>
			<ChevronDown class="size-4" />
		</Button>
	</OpenInTrigger>
	<OpenInContent align="end" preventScroll={false}>
		<!-- <OpenInLabel>Open in</OpenInLabel> -->
		<!-- <OpenInSeparator /> -->
		<DropdownMenu.Item class="w-full">
			<a
				href={llmsTxtUrl}
				rel="noopener"
				target="_blank"
				class="flex w-full items-center gap-2"
			>
				<span class="shrink-0">
					<Markdown />
				</span>
				<span class="flex-1">Open in Markdown</span>
				<ExternalLink class="size-4 shrink-0" />
			</a>
		</DropdownMenu.Item>
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
		<OpenInChatGPT />
		<OpenInClaude />
		<OpenInT3 />
		<OpenInScira />
	</OpenInContent>
</OpenIn>
