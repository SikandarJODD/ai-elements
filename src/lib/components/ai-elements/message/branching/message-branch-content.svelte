<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import {
		getMessageBranchContext,
		type MessageVersion,
	} from "../context/message-context.svelte.js";
	import MessageContent from "../core/message-content.svelte";
	import MessageResponse from "../response/message-response.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		versions: MessageVersion[];
		class?: string;
	}

	let { versions, class: className, ...restProps }: Props = $props();

	const branchContext = getMessageBranchContext();

	$effect(() => {
		branchContext.setTotalBranches(versions.length);
	});
</script>

{#each versions as version, index (version.id)}
	<div
		class={cn(
			"grid gap-2 overflow-hidden [&>div]:pb-0",
			index === branchContext.currentBranch ? "block" : "hidden",
			className
		)}
		{...restProps}
	>
		<MessageContent>
			<MessageResponse content={version.content} />
		</MessageContent>
	</div>
{/each}
