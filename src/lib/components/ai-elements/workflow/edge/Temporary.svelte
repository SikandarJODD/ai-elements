<script lang="ts">
	import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/svelte";

	let { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps =
		$props();

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

	$inspect(edgePath, "Edge path");
</script>

<BaseEdge class="stroke-ring stroke-1" {id} path={edgePath} style="stroke-dasharray: 5, 5;" />
