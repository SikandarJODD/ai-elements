<script lang="ts">
	import { untrack } from "svelte";
	import type { Snippet } from "svelte";
	import { PromptInputProviderController } from "../core/controllers.svelte.js";
	import { setProviderController } from "../core/context.js";

	export interface ProviderProps {
		initialInput?: string;
		children?: Snippet;
	}

	let { initialInput = "", children }: ProviderProps = $props();

	const controller = new PromptInputProviderController(untrack(() => initialInput));
	setProviderController(controller);

	$effect(() => {
		return () => controller.destroy();
	});
</script>

{@render children?.()}
