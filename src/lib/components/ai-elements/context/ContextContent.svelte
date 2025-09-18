<script lang="ts">
	import HoverCardContent from '$lib/components/ui/hover-card/hover-card-content.svelte';
	import { cn } from '$lib/utils.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...props }: Props = $props();
</script>

<HoverCardContent
	class={cn('min-w-[240px] divide-y overflow-hidden p-0', className)}
	{...props}
>
	{@render children?.()}
</HoverCardContent>