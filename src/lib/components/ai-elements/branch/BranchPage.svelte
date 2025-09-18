<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { getBranchContext } from './branch-context.js';

	interface Props {
		class?: string;
		[key: string]: any;
	}

	let { class: className, ...restProps }: Props = $props();

	const { currentBranch, totalBranches } = getBranchContext();
</script>

<span
	class={cn(
		'font-medium text-muted-foreground text-xs tabular-nums',
		className
	)}
	{...restProps}
>
	{currentBranch + 1} of {totalBranches}
</span>