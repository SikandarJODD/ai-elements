<script lang="ts">
	import {
		Plan,
		PlanHeader,
		PlanTitle,
		PlanDescription,
		PlanAction,
		PlanContent,
		PlanTrigger,
	} from "$lib/components/ai-elements/plan/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import FileTextIcon from "@lucide/svelte/icons/file-text";

	let isStreaming = $state(false);

	function toggleStreaming() {
		isStreaming = !isStreaming;
	}
</script>

<div class="space-y-4">
	<Button onclick={toggleStreaming}>
		{isStreaming ? "Stop Streaming" : "Start Streaming"}
	</Button>

	<Plan {isStreaming} open={false}>
		<PlanHeader>
			<div class="flex-1">
				<div class="mb-4 flex items-center gap-2">
					<FileTextIcon class="size-4" />
					<PlanTitle>
						{#snippet children()}
							AI-Powered Code Review
						{/snippet}
					</PlanTitle>
				</div>
				<PlanDescription>
					{#snippet children()}
						Analyzing your codebase and generating recommendations for improvements and
						best practices.
					{/snippet}
				</PlanDescription>
			</div>
			<PlanAction>
				<PlanTrigger />
			</PlanAction>
		</PlanHeader>
		<PlanContent>
			<div class="space-y-4 text-sm">
				<div>
					<h3 class="mb-2 font-semibold">Analysis Steps</h3>
					<ul class="list-inside list-disc space-y-1">
						<li>Scan codebase for patterns</li>
						<li>Identify potential issues</li>
						<li>Generate improvement suggestions</li>
						<li>Create detailed report</li>
					</ul>
				</div>
			</div>
		</PlanContent>
	</Plan>
</div>
