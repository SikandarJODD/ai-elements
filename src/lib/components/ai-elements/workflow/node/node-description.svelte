<script lang="ts">
	import { CardDescription } from "$lib/components/ui/card";
	import type { WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<CardDescription bind:ref class={className} {...restProps}>
	{@render children?.()}
</CardDescription>
