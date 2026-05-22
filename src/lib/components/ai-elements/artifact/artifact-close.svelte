<script lang="ts">
	import { Button, type ButtonProps } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";

	interface Props extends ButtonProps {
		class?: string;
		size?: ButtonProps["size"];
		variant?: ButtonProps["variant"];
	}

	let {
		class: className,
		children,
		size = "sm",
		variant = "ghost",
		...restProps
	}: Props = $props();
</script>

<Button
	class={cn("text-muted-foreground hover:text-foreground size-8 p-0", className)}
	{size}
	type="button"
	{variant}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- X icon (you might want to import an actual icon component) -->
		<svg
			class="size-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			></path>
		</svg>
	{/if}
	<span class="sr-only">Close</span>
</Button>
