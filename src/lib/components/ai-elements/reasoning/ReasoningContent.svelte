<script lang="ts">
	import { cn } from "$lib/utils";
	import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";
	import Response from "./Response.svelte";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className = "", children, ...props }: Props = $props();
</script>

<CollapsibleContent
	class={cn(
		"mt-4 text-sm",
		"data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-muted-foreground data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
		className
	)}
	{...props}
>
	<Response class="grid gap-2">
		{@render children?.()}
	</Response>
</CollapsibleContent>
