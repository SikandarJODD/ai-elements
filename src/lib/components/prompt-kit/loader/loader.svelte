<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import CircularLoader from "./circular-loader.svelte";
	import ClassicLoader from "./classic-loader.svelte";
	import PulseLoader from "./pulse-loader.svelte";
	import PulseDotLoader from "./pulse-dot-loader.svelte";
	import DotsLoader from "./dots-loader.svelte";
	import TypingLoader from "./typing-loader.svelte";
	import WaveLoader from "./wave-loader.svelte";
	import BarsLoader from "./bars-loader.svelte";
	import TerminalLoader from "./terminal-loader.svelte";
	import TextBlinkLoader from "./text-blink-loader.svelte";
	import TextShimmerLoader from "./text-shimmer-loader.svelte";
	import TextDotsLoader from "./text-dots-loader.svelte";

	interface Props {
		variant?:
			| "circular"
			| "classic"
			| "pulse"
			| "pulse-dot"
			| "dots"
			| "typing"
			| "wave"
			| "bars"
			| "terminal"
			| "text-blink"
			| "text-shimmer"
			| "loading-dots";
		size?: "sm" | "md" | "lg";
		text?: string;
		class?: string;
	}

	let { variant = "circular", size = "md", text, class: className }: Props = $props();
</script>

{#if variant === "circular"}
	<CircularLoader {size} class={className} />
{:else if variant === "classic"}
	<ClassicLoader {size} class={className} />
{:else if variant === "pulse"}
	<PulseLoader {size} class={className} />
{:else if variant === "pulse-dot"}
	<PulseDotLoader {size} class={className} />
{:else if variant === "dots"}
	<DotsLoader {size} class={className} />
{:else if variant === "typing"}
	<TypingLoader {size} class={className} />
{:else if variant === "wave"}
	<WaveLoader {size} class={className} />
{:else if variant === "bars"}
	<BarsLoader {size} class={className} />
{:else if variant === "terminal"}
	<TerminalLoader {size} class={className} />
{:else if variant === "text-blink"}
	<TextBlinkLoader {text} {size} class={className} />
{:else if variant === "text-shimmer"}
	<TextShimmerLoader {text} {size} class={className} />
{:else if variant === "loading-dots"}
	<TextDotsLoader {text} {size} class={className} />
{:else}
	<CircularLoader {size} class={className} />
{/if}
