<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		value?: string;
		placeholder?: string;
		class?: string;
	}

	let {
		value = $bindable(""),
		placeholder = "Search...",
		class: className,
		...props
	}: Props = $props();
</script>

<Command.Input bind:value {placeholder} class={cn(className)} {...props} />

