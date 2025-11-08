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
	import CheckIcon from "@lucide/svelte/icons/check";
</script>

<div class="space-y-4">
	<Plan open={false}>
		<PlanHeader>
			<div class="flex-1">
				<PlanTitle>
					{#snippet children()}
						Phase 1: Research
					{/snippet}
				</PlanTitle>
				<PlanDescription>
					{#snippet children()}
						Gather requirements and analyze existing solutions.
					{/snippet}
				</PlanDescription>
			</div>
			<PlanAction>
				<PlanTrigger />
			</PlanAction>
		</PlanHeader>
		<PlanContent>
			<ul class="space-y-2 text-sm">
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Market research</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Competitor analysis</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>User interviews</span>
				</li>
			</ul>
		</PlanContent>
	</Plan>

	<Plan open={false}>
		<PlanHeader>
			<div class="flex-1">
				<PlanTitle>
					{#snippet children()}
						Phase 2: Design
					{/snippet}
				</PlanTitle>
				<PlanDescription>
					{#snippet children()}
						Create wireframes and design system components.
					{/snippet}
				</PlanDescription>
			</div>
			<PlanAction>
				<PlanTrigger />
			</PlanAction>
		</PlanHeader>
		<PlanContent>
			<ul class="space-y-2 text-sm">
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Create wireframes</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Design system setup</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Prototype key flows</span>
				</li>
			</ul>
		</PlanContent>
	</Plan>

	<Plan open={false}>
		<PlanHeader>
			<div class="flex-1">
				<PlanTitle>
					{#snippet children()}
						Phase 3: Development
					{/snippet}
				</PlanTitle>
				<PlanDescription>
					{#snippet children()}
						Build and test the application features.
					{/snippet}
				</PlanDescription>
			</div>
			<PlanAction>
				<PlanTrigger />
			</PlanAction>
		</PlanHeader>
		<PlanContent>
			<ul class="space-y-2 text-sm">
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Set up development environment</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Implement core features</span>
				</li>
				<li class="flex items-start gap-2">
					<CheckIcon class="mt-0.5 size-4 text-green-600" />
					<span>Write tests</span>
				</li>
			</ul>
		</PlanContent>
	</Plan>
</div>
