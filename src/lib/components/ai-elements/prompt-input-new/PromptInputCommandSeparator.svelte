<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as Command from "$lib/components/ui/command/index.js";

	interface Props {
		class?: string;
	}

	let { class: className, ...props }: Props = $props();
</script>

<Command.Separator class={cn(className)} {...props} />
