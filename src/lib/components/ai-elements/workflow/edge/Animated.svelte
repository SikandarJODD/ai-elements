<script lang="ts">
	import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/svelte";

	let {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		markerEnd,
		style,
	}: EdgeProps = $props();

	let edgePath = $derived.by(
		() =>
			getBezierPath({
				sourceX,
				sourceY,
				sourcePosition,
				targetX,
				targetY,
				targetPosition,
			})[0]
	);
</script>

{#if edgePath}
	<BaseEdge {id} {markerEnd} path={edgePath} {style} />
	<circle fill="var(--primary)" r="4">
		<animateMotion dur="2s" path={edgePath} repeatCount="indefinite" />
	</circle>
{/if}
