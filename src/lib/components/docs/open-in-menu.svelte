<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		OpenIn,
		OpenInTrigger,
		OpenInContent,
		OpenInLabel,
		OpenInSeparator,
		OpenInChatGPT,
		OpenInClaude,
		OpenInT3,
		OpenInScira,
		GitHubIcon,
	} from "$lib/components/ai-elements/open-in-chat";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { ChevronDown, ExternalLink } from "@lucide/svelte";
	import { getPromptKitGithubUrl, getAiElementsGithubUrl } from "$lib/config/github-paths";

	interface Props {
		componentName: string;
		llmsTxtUrl: string;
		type?: "prompt-kit" | "ai-elements";
	}

	let { componentName, llmsTxtUrl, type = "prompt-kit" }: Props = $props();

	// Create the query for AI assistants
	const query = `Read ${llmsTxtUrl} and help me understand the ${componentName} component`;

	// Get the exact GitHub file URL for the component based on type
	const githubUrl =
		type === "ai-elements"
			? getAiElementsGithubUrl(componentName) ||
				`https://github.com/search?type=code&q=${encodeURIComponent(componentName)}`
			: getPromptKitGithubUrl(componentName) ||
				`https://github.com/search?type=code&q=${encodeURIComponent(componentName)}`;
</script>

<OpenIn {query}>
	<OpenInTrigger>
		<Button variant="secondary" size="lg" class="gap-2">
			<span>Open</span>
			<ChevronDown class="size-4" />
		</Button>
	</OpenInTrigger>
	<OpenInContent align="end" preventScroll={false}>
		<OpenInLabel>Open in</OpenInLabel>
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
		<OpenInChatGPT />
		<OpenInClaude />
		<OpenInT3 />
		<OpenInScira />
	</OpenInContent>
</OpenIn>
