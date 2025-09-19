<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { WebPreviewContext, setWebPreviewContext } from './web-preview-context.svelte.js';

	let {
		defaultUrl = '',
		onUrlChange,
		class: className,
		children,
		...restProps
	}: {
		defaultUrl?: string;
		onUrlChange?: (url: string) => void;
		class?: string;
		children: import('svelte').Snippet;
		[key: string]: any;
	} = $props();

	// Create and set the context
	let context = new WebPreviewContext(defaultUrl, onUrlChange);
	setWebPreviewContext(context);
</script>

<div
	class={cn(
		"flex size-full flex-col rounded-lg border bg-card",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>