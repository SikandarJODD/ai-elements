<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";

	export interface CheckpointIconProps {
		class?: string;
		children?: Snippet;
		size?: number;
	}
</script>

<script lang="ts">
	import { Bookmark } from "@lucide/svelte";

	let { class: className, children, size = 16, ...restProps }: CheckpointIconProps = $props();
</script>

{#if children}
	{@render children()}
{:else}
	<Bookmark class={cn("size-4 shrink-0", className)} {size} {...restProps} />
{/if}
