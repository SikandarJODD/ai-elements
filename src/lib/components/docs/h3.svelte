<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'id'> {
		class?: string;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

	let ref = $state<HTMLHeadingElement>();
	let id = $state<string>();

	onMount(() => {
		id = ref?.innerText.split(' ').join('-').toLowerCase();
	});
</script>

<h3
	bind:this={ref}
	{id}
	class={cn('text-lg font-semibold mb-3 mt-6 scroll-m-20', className)}
	{...rest}
>
	{@render children?.()}
</h3>
