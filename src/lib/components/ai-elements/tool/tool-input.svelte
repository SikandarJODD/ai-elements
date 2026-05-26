<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Code from "$lib/components/ai-elements/code/index.js";

	interface ToolInputProps {
		class?: string;
		input: any;
		[key: string]: any;
	}

	let { class: className = "", input, ...restProps }: ToolInputProps = $props();

	let formattedInput = $derived.by(() => {
		return JSON.stringify(input, null, 2);
	});

	let id = $props.id();
</script>

<div {id} class={cn("space-y-2 overflow-hidden p-4", className)} {...restProps}>
	<h4 class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Parameters</h4>
	<div class="bg-muted/50 rounded-md">
		<Code.Root code={formattedInput} lang="json" hideLines>
			<Code.CopyButton />
		</Code.Root>
	</div>
</div>
