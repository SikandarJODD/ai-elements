<script lang="ts">
	import {
		Node,
		NodeHeader,
		NodeTitle,
		NodeDescription,
		NodeContent,
	} from "$lib/components/ai-elements/workflow/node/index.js";
</script>

<div class="flex justify-center p-8">
	<Node handles={{ target: true, source: true }}>
		<NodeHeader>
			<NodeTitle>Workflow Node</NodeTitle>
			<NodeDescription>A composable node component</NodeDescription>
		</NodeHeader>
		<NodeContent>
			<p class="text-sm">Node content goes here</p>
		</NodeContent>
	</Node>
</div>
