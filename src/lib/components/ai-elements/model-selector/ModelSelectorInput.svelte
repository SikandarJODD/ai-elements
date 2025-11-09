<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";
	import { cn } from "$lib/utils/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: WithoutChildrenOrChild<CommandPrimitive.InputProps> = $props();
</script>

<Command.Input bind:ref bind:value class={cn("h-auto py-3.5", className)} {...restProps} />
