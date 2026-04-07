<script lang="ts">
	import type { ComponentProps } from "svelte";
	import * as InputGroup from "$lib/components/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";

	type HeaderProps = Omit<ComponentProps<typeof InputGroup.Addon>, "align">;

	let { class: className, ...restProps }: HeaderProps = $props();
</script>

<InputGroup.Addon align="block-end" class={cn("order-first flex-wrap gap-1", className)} {...restProps} />
