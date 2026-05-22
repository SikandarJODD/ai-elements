<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	export type ActionsProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, children, ...restProps }: ActionsProps = $props();
</script>

<div class={cn("flex items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</div>
