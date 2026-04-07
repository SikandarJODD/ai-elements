<script lang="ts">
	import type { ComponentProps } from "svelte";
	import * as InputGroup from "$lib/components/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";

	type FooterProps = Omit<ComponentProps<typeof InputGroup.Addon>, "align">;

	let { class: className, ...restProps }: FooterProps = $props();
</script>

<InputGroup.Addon align="block-end" class={cn("justify-between gap-1", className)} {...restProps} />
