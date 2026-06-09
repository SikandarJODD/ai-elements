<script lang="ts">
	import * as Plan from "$lib/components/ai-elements/plan/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<div class="w-full max-w-2xl">
	<Plan.Root open={false}>
		<Plan.Header>
			<div>
				<div class="mb-4 flex items-center gap-2">
					<FileTextIcon class="size-4" />
					<Plan.Title>
						{#snippet children()}
							Rewrite AI Elements to SolidJS
						{/snippet}
					</Plan.Title>
				</div>
				<Plan.Description>
					{#snippet children()}
						Rewrite the AI Elements component library from React to SolidJS while
						maintaining compatibility with existing React-based shadcn/ui components
						using solid-js/compat, updating all 29 components and their test suite.
					{/snippet}
				</Plan.Description>
			</div>
			<Plan.Trigger />
		</Plan.Header>
		<Plan.Content>
			<div class="space-y-4 text-sm">
				<div>
					<h3 class="mb-2 font-semibold">Overview</h3>
					<p>
						This plan outlines the migration strategy for converting the AI Elements
						library from React to SolidJS, ensuring compatibility and maintaining
						existing functionality.
					</p>
				</div>
				<div>
					<h3 class="mb-2 font-semibold">Key Steps</h3>
					<ul class="list-inside list-disc space-y-1">
						<li>Set up SolidJS project structure</li>
						<li>Install solid-js/compat for React compatibility</li>
						<li>Migrate components one by one</li>
						<li>Update test suite for each component</li>
						<li>Verify compatibility with shadcn/ui</li>
					</ul>
				</div>
			</div>
		</Plan.Content>
		<Plan.Footer class="justify-end">
			<Plan.Action>
				<Button size="sm">
					Build <kbd class="font-mono">⌘↩</kbd>
				</Button>
			</Plan.Action>
		</Plan.Footer>
	</Plan.Root>
</div>
