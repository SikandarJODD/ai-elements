<script lang="ts" module>
	import type { ButtonProps } from "$lib/components/ui/button/button.svelte";

	export interface ConfirmationActionProps extends ButtonProps {}
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";

	let {
		class: className,
		variant = "default",
		size = "sm",
		children,
		...restProps
	}: ConfirmationActionProps = $props();
</script>

<Button class={cn("h-8 px-3 text-sm", className)} type="button" {variant} {size} {...restProps}>
	{@render children?.()}
</Button>
