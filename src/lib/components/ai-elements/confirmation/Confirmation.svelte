<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import type { ToolUIPartApproval, ToolUIPartState } from "./confirmation-context.svelte.js";

	export interface ConfirmationProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		approval?: ToolUIPartApproval;
		state: ToolUIPartState;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Alert } from "$lib/components/ui/alert/index.js";
	import { setConfirmationContext } from "./confirmation-context.svelte.js";
	import { watch } from "runed";

	let {
		class: className,
		approval,
		state,
		children,
		ref = $bindable(null),
		...restProps
	}: ConfirmationProps = $props();

	// Only render if approval exists and not in input states
	let shouldRender = $derived(
		approval && state !== "input-streaming" && state !== "input-available"
	);

	// Set context for child components immediately (for SSR)
	setConfirmationContext({ approval, state });

	// Watch for changes and update context reactively
	// watch([() => approval, () => state], ([newApproval, newState]) => {
	// 	setConfirmationContext({ approval: newApproval, state: newState });
	// });
	watch(
		() => approval,
		(newApproval) => {
			setConfirmationContext({ approval: newApproval, state });
		}
	);
</script>

{#if shouldRender}
	<Alert bind:ref class={cn("flex flex-col gap-2", className)} {...restProps}>
		{@render children?.()}
	</Alert>
{/if}
