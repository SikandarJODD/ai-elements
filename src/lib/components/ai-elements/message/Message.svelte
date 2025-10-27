<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { UIMessage } from "ai";
	import type { HTMLAttributes } from "svelte/elements";

	type MessageProps = HTMLAttributes<HTMLDivElement> & {
		from: UIMessage["role"];
	};

	let { class: className = "", from, children, ...restProps }: MessageProps = $props();

	let id = $props.id();

	const messageClasses = $derived.by(() =>
		cn(
			"group flex w-full items-end justify-end gap-2 py-4",
			from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
			className
		)
	);
</script>

<div class={messageClasses} data-message-id={id} {...restProps}>
	{@render children?.()}
</div>
