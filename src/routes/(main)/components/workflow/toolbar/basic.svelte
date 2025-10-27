<script lang="ts">
	import { Node, NodeContent } from "$lib/components/ai-elements/workflow/node/index.js";
	import { Toolbar } from "$lib/components/ai-elements/workflow/toolbar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex min-h-[300px] items-center justify-center p-8">
	<div class="relative">
		<Node handles={{ target: false, source: false }}>
			<NodeContent>
				<p class="text-sm">Node with Toolbar</p>
			</NodeContent>
			<Toolbar>
				<Button size="sm" variant="ghost">Edit</Button>
				<Button size="sm" variant="ghost">Delete</Button>
			</Toolbar>
		</Node>
	</div>
</div>
