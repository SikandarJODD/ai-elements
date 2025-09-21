<script lang="ts">
	import { cn } from "$lib/utils";
	import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar/index.js";
	import type { ComponentProps } from "svelte";

	type MessageAvatarProps = ComponentProps<typeof Avatar> & {
		src: string;
		name?: string;
	};

	let {
		src,
		name,
		class: className = "",
		...restProps
	}: MessageAvatarProps = $props();

	const id = crypto.randomUUID();

	const avatarClasses = $derived.by(() =>
		cn("size-8 ring-1 ring-border", className)
	);

	const fallbackText = $derived.by(() =>
		name?.slice(0, 2) || "ME"
	);
</script>

<Avatar class={avatarClasses} data-avatar-id={id} {...restProps}>
	<AvatarImage alt="" class="mt-0 mb-0" {src} />
	<AvatarFallback>{fallbackText}</AvatarFallback>
</Avatar>