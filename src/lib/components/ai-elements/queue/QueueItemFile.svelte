<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemFileProps extends WithElementRef<HTMLAttributes<HTMLSpanElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import Paperclip from "@lucide/svelte/icons/paperclip";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueItemFileProps = $props();
</script>

<span
	bind:this={ref}
	class={cn("bg-muted flex items-center gap-1 rounded border px-2 py-1 text-xs", className)}
	{...restProps}
>
	<Paperclip size={12} />
	<span class="max-w-[100px] truncate">{@render children?.()}</span>
</span>
