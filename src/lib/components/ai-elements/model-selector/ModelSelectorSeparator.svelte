<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js";
	import type { Command as CommandPrimitive } from "bits-ui";
	import type { WithoutChildrenOrChild } from "$lib/utils/utils.js";

	let {
		ref = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<CommandPrimitive.SeparatorProps> = $props();
</script>

<Command.Separator bind:ref {...restProps} />
