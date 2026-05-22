<script lang="ts">
	import { cn } from "$lib/utils";
	import type { ChatStatus } from "../context/types.js";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";
	import SquareIcon from "@lucide/svelte/icons/square";
	import XIcon from "@lucide/svelte/icons/x";

	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/components/ui/button/index.js";

	import type { HTMLButtonAttributes } from "svelte/elements";

	type SubmitClickEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};

	interface Props extends Omit<HTMLButtonAttributes, "type" | "onclick" | "aria-label"> {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		status?: ChatStatus;
		onStop?: () => void;
		ref?: HTMLButtonElement | null;
		onclick?: (event: SubmitClickEvent) => void;
		children?: import("svelte").Snippet;
	}

	let {
		class: className,
		ref = $bindable(null),
		variant = "default",
		size = "icon",
		status = "ready",
		onStop,
		onclick,
		children,
		...props
	}: Props = $props();

	let isGenerating = $derived(status === "submitted" || status === "streaming");

	let Icon = $derived.by(() => {
		if (status === "submitted") {
			return LoaderIcon;
		} else if (status === "streaming") {
			return SquareIcon;
		} else if (status === "error") {
			return XIcon;
		}
		// for ready status, show send icon
		return SendIcon;
	});

	let buttonType = $derived.by((): "button" | "submit" => {
		return isGenerating ? "button" : "submit";
	});

	let ariaLabel = $derived.by(() => {
		return isGenerating ? "Stop" : "Submit";
	});

	let iconClass = $derived.by(() => {
		if (status === "submitted") {
			return "size-4 animate-spin";
		}
		return "size-4";
	});

	let handleClick = (event: SubmitClickEvent) => {
		if (isGenerating) {
			event.preventDefault();
			onStop?.();
			return;
		}

		onclick?.(event);
	};
</script>

<button
	bind:this={ref}
	aria-label={ariaLabel}
	class={cn(buttonVariants({ variant, size }), "gap-1.5 rounded-lg", className)}
	data-slot="button"
	type={buttonType}
	onclick={handleClick}
	{...props}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon class={iconClass} />
	{/if}
</button>
