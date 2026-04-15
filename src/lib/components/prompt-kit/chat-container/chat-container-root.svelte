<script lang="ts">
	import {
		setChatContainerContext,
		type ResizeMode,
		type InitialMode,
	} from "./chat-container-context.svelte";
	import { cn } from "$lib/utils/utils";
	import { watch } from "runed";

	let {
		ref = $bindable<HTMLDivElement | null>(null),
		children,
		class: className,
		resize = "smooth",
		initial = "instant",
		...restProps
	}: {
		ref: HTMLDivElement | null;
		children?: import("svelte").Snippet;
		class?: string;
		resize?: ResizeMode;
		initial?: InitialMode;
		[key: string]: any;
	} = $props();

	let context = setChatContainerContext("smooth", "instant");

	watch(
		() => ref,
		() => {
			if (ref) {
				context.setElement(ref);
			}
		}
	);
	watch(
		() => resize,
		() => {
			context.updateResizeMode(resize);
		}
	);
	watch(
		() => initial,
		() => {
			context.updateInitialMode(initial);
		}
	);
</script>

<div bind:this={ref} class={cn("flex overflow-y-auto", className)} role="log" {...restProps}>
	{@render children?.()}
</div>
