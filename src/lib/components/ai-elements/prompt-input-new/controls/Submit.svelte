<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/components/ui/button/index.js";
	import type { ChatStatus } from "../context/types.js";
	import Loader2Icon from "../icons/Loader2Icon.svelte";
	import SendIcon from "../icons/SendIcon.svelte";
	import SquareIcon from "../icons/SquareIcon.svelte";
	import XIcon from "../icons/XIcon.svelte";
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
		status,
		onStop,
		onclick,
		children,
		...props
	}: Props = $props();

	let isGenerating = $derived(status === "submitted" || status === "streaming");

	let Icon = $derived.by(() => {
		if (status === "submitted") {
			return Loader2Icon;
		} else if (status === "streaming") {
			return SquareIcon;
		} else if (status === "error") {
			return XIcon;
		}
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
	data-prompt-input-submit=""
	data-slot="button"
	type={buttonType}
	onclick={handleClick}
	{...props}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- <svelte:component this={Icon} class={iconClass} /> -->
		<Icon class={iconClass} />
	{/if}
</button>
