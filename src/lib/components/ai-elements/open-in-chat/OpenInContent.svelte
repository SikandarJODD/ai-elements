<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { cn } from "$lib/utils/utils";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
		align?: "start" | "center" | "end";
	}

	let { class: className = "", align = "start", children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Content {align} class={cn("w-[240px]", className)} {...restProps}>
	{@render children?.()}
</DropdownMenu.Content>
