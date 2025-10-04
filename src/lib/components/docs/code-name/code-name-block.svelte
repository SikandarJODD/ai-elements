<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Code from '$lib/components/ai-elements/code';
	import { CopyButton } from '$lib/components/ai-elements/copy-button';
	import { TypeScript as TypescriptIcon, Svelte as SvelteIcon, Terminal as TerminalIcon, CodeIcon } from '$lib/components/icons';
	import type { SupportedLanguage } from '$lib/components/ai-elements/code/shiki';
	import type { Snippet } from 'svelte';

	let {
		filename,
		lang = 'typescript',
		code,
		class: className,
		variant = 'default',
		hideLines = false,
		highlight = [],
		showCopyButton = true,
		children,
		...rest
	}: {
		filename: string;
		lang?: SupportedLanguage;
		code: string;
		class?: string;
		variant?: 'default' | 'secondary';
		hideLines?: boolean;
		highlight?: (number | [number, number])[];
		showCopyButton?: boolean;
		children?: Snippet;
		[key: string]: any;
	} = $props();

	// Function to get the appropriate icon based on language
	function getLanguageIcon(language: SupportedLanguage) {
		switch (language) {
			case 'svelte':
				return SvelteIcon;
			case 'typescript':
			case 'tsx':
				return TypescriptIcon;
			case 'bash':
				return TerminalIcon;
			case 'javascript':
			case 'jsx':
			case 'json':
			case 'python':
			case 'css':
			case 'diff':
			case 'text':
			default:
				return CodeIcon;
		}
	}

	const IconComponent = getLanguageIcon(lang);
</script>

<div class={cn('not-prose relative overflow-hidden rounded-lg border', className)} {...rest}>
	<!-- Header with filename, icon, and copy button -->
	<div class="flex items-center justify-between border-b bg-muted/50 pl-4 pr-2 py-2">
		<div class="flex items-center gap-2 min-w-0">
			<IconComponent class="size-4 shrink-0" />
			<span class="text-sm font-medium text-muted-foreground truncate">{filename}</span>
		</div>
		{#if showCopyButton}
			<CopyButton text={code} size="sm" variant="ghost" class="h-6 w-6 shrink-0" />
		{/if}
	</div>

	<!-- Code block -->
	<Code.Root {lang} {code} {variant} {hideLines} {highlight} class="border-0 rounded-none">
		{@render children?.()}
	</Code.Root>
</div>