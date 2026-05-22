<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface ConfirmationTitleProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { AlertDescription } from "$lib/components/ui/alert/index.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: ConfirmationTitleProps = $props();
</script>

<AlertDescription bind:ref class={cn("inline", className)} {...restProps}>
	{@render children?.()}
</AlertDescription>
