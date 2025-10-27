<script lang="ts">
	import { CardTitle } from "$lib/components/ui/card";
	import type { WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<CardTitle bind:ref class={className} {...restProps}>
	{@render children?.()}
</CardTitle>
