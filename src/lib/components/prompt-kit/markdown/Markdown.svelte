<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { Streamdown, type StreamdownProps } from 'svelte-streamdown';
	import { mode } from 'mode-watcher';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		content: string;
		id?: string;
		class?: string;
	} & Omit<StreamdownProps, 'content' | 'class'> &
		Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

	let { content, id, class: className, ...restProps }: Props = $props();
</script>

<div {id} class={cn(className)} {...restProps}>
	<Streamdown
		content={content}
		class="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
		shikiTheme={mode.current === 'dark' ? 'github-dark-default' : 'github-light-default'}
		shikiPreloadThemes={['github-dark-default', 'github-light-default']}
		baseTheme="shadcn"
	/>
</div>
