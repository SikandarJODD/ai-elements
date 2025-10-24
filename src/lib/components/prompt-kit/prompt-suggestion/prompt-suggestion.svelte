<script lang="ts" module>
	import type { ButtonVariant, ButtonSize } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type PromptSuggestionProps = {
		children?: Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		highlight?: string;
		ref?: HTMLElement | null;
		onclick?: (event: MouseEvent) => void;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	let {
		children,
		variant = undefined,
		size = undefined,
		class: className,
		highlight = undefined,
		ref = $bindable(null),
		onclick,
		disabled,
		type = 'button'
	}: PromptSuggestionProps = $props();

	const isHighlightMode = $derived(
		highlight !== undefined && highlight.trim() !== ''
	);
	const content = $derived(
		typeof children === 'string' ? (children as string) : ''
	);

	const highlightedContent = $derived.by(() => {
		if (!isHighlightMode || !content) {
			return null;
		}

		const trimmedHighlight = highlight!.trim();
		const contentLower = content.toLowerCase();
		const highlightLower = trimmedHighlight.toLowerCase();
		const shouldHighlight = contentLower.includes(highlightLower);

		if (!shouldHighlight) {
			return {
				before: '',
				highlighted: '',
				after: '',
				text: content,
				hasMatch: false
			};
		}

		const index = contentLower.indexOf(highlightLower);
		if (index === -1) {
			return {
				before: '',
				highlighted: '',
				after: '',
				text: content,
				hasMatch: false
			};
		}

		const actualHighlightedText = content.substring(
			index,
			index + highlightLower.length
		);
		const before = content.substring(0, index);
		const after = content.substring(index + actualHighlightedText.length);

		return {
			before,
			highlighted: actualHighlightedText,
			after,
			text: '',
			hasMatch: true
		};
	});
</script>

{#if !isHighlightMode}
	<Button
		bind:ref
		variant={variant || 'outline'}
		size={size || 'lg'}
		class={cn('rounded-full', className)}
		{onclick}
		{disabled}
		{type}
	>
		{@render children?.()}
	</Button>
{:else if !content}
	<Button
		bind:ref
		variant={variant || 'ghost'}
		size={size || 'sm'}
		class={cn(
			'w-full cursor-pointer justify-start rounded-xl py-2',
			'hover:bg-accent',
			className
		)}
		{onclick}
		{disabled}
		{type}
	>
		{@render children?.()}
	</Button>
{:else}
	<Button
		bind:ref
		variant={variant || 'ghost'}
		size={size || 'sm'}
		class={cn(
			'w-full cursor-pointer justify-start gap-0 rounded-xl py-2',
			'hover:bg-accent',
			className
		)}
		{onclick}
		{disabled}
		{type}
	>
		{#if highlightedContent?.hasMatch}
			{#if highlightedContent.before}
				<span class="text-muted-foreground whitespace-pre-wrap">
					{highlightedContent.before}
				</span>
			{/if}
			<span class="text-primary font-medium whitespace-pre-wrap">
				{highlightedContent.highlighted}
			</span>
			{#if highlightedContent.after}
				<span class="text-muted-foreground whitespace-pre-wrap">
					{highlightedContent.after}
				</span>
			{/if}
		{:else}
			<span class="text-muted-foreground whitespace-pre-wrap">
				{highlightedContent?.text || content}
			</span>
		{/if}
	</Button>
{/if}
