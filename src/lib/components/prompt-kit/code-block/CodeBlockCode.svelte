<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { codeToHtml } from 'shiki';
	import { watch } from 'runed';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		code,
		language = 'tsx',
		theme = 'github-light',
		class: className,
		...restProps
	}: {
		code: string;
		language?: string;
		theme?: string;
		class?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let highlightedHtml = $state<string | null>(null);

	async function highlight() {
		if (!code) {
			highlightedHtml = '<pre><code></code></pre>';
			return;
		}

		const html = await codeToHtml(code, { lang: language, theme });
		highlightedHtml = html;
	}

	// Watch for changes in code, language, or theme
	watch(
		() => [code, language, theme],
		() => {
			highlight();
		}
	);

	const classNames = cn(
		'w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4',
		className
	);
</script>

<!-- SSR fallback: render plain code if not hydrated yet -->
{#if highlightedHtml}
	<div class={classNames} {...restProps}>
		{@html highlightedHtml}
	</div>
{:else}
	<div class={classNames} {...restProps}>
		<pre><code>{code}</code></pre>
	</div>
{/if}
