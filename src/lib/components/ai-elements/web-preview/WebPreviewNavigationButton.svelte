<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger,
	} from "$lib/components/ui/tooltip/index.js";

	let {
		onclick,
		disabled,
		tooltip,
		children,
		...restProps
	}: {
		onclick?: (event: MouseEvent) => void;
		disabled?: boolean;
		tooltip?: string;
		children: import("svelte").Snippet;
		[key: string]: any;
	} = $props();
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			<Button
				class="hover:text-foreground h-8 w-8 p-0"
				{disabled}
				{onclick}
				size="sm"
				variant="ghost"
				{...restProps}
			>
				{@render children()}
			</Button>
		</TooltipTrigger>
		<TooltipContent>
			<p>{tooltip}</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
