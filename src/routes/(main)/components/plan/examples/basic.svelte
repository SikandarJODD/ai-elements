<script lang="ts">
	import {
		Plan,
		PlanAction,
		PlanContent,
		PlanDescription,
		PlanFooter,
		PlanHeader,
		PlanTitle,
		PlanTrigger,
	} from "$lib/components/ai-elements/plan/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<Plan open={false}>
	<PlanHeader>
		<div>
			<div class="mb-4 flex items-center gap-2">
				<FileTextIcon class="size-4" />
				<PlanTitle>
					{#snippet children()}
						Rewrite AI Elements to SolidJS
					{/snippet}
				</PlanTitle>
			</div>
			<PlanDescription>
				{#snippet children()}
					Rewrite the AI Elements component library from React to SolidJS while
					maintaining compatibility with existing React-based shadcn/ui components using
					solid-js/compat, updating all 29 components and their test suite.
				{/snippet}
			</PlanDescription>
		</div>
		<PlanTrigger />
	</PlanHeader>
	<PlanContent>
		<div class="space-y-4 text-sm">
			<div>
				<h3 class="mb-2 font-semibold">Overview</h3>
				<p>
					This plan outlines the migration strategy for converting the AI Elements library
					from React to SolidJS, ensuring compatibility and maintaining existing
					functionality.
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
	</PlanContent>
	<PlanFooter class="justify-end">
		<PlanAction>
			<Button size="sm">
				Build <kbd class="font-mono">⌘↩</kbd>
			</Button>
		</PlanAction>
	</PlanFooter>
</Plan>
