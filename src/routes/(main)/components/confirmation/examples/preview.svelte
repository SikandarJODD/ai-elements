<script lang="ts">
	import * as Confirmation from "$lib/components/ai-elements/confirmation/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import XIcon from "@lucide/svelte/icons/x";

	// Generate a unique ID for the approval
	let approvalId = crypto.randomUUID();
</script>

<div class="w-full max-w-2xl">
	<Confirmation.Root approval={{ id: approvalId }} state="approval-requested">
		<Confirmation.Title>
			<Confirmation.Request>
				This tool wants to delete the file
				<code class="bg-muted inline rounded px-1.5 py-0.5 text-sm">
					/tmp/example.txt
				</code>
				. Do you approve this action?
			</Confirmation.Request>
			<Confirmation.Accepted>
				<CheckIcon class="size-4 text-green-600 dark:text-green-400" />
				<span>You approved this tool execution</span>
			</Confirmation.Accepted>
			<Confirmation.Rejected>
				<XIcon class="text-destructive size-4" />
				<span>You rejected this tool execution</span>
			</Confirmation.Rejected>
		</Confirmation.Title>
		<Confirmation.Actions>
			<Confirmation.Action
				onclick={() => {
					// In production, call respondToConfirmationRequest with approved: false
					console.log("Rejected");
				}}
				variant="outline"
			>
				Reject
			</Confirmation.Action>
			<Confirmation.Action
				onclick={() => {
					// In production, call respondToConfirmationRequest with approved: true
					console.log("Approved");
				}}
				variant="default"
			>
				Approve
			</Confirmation.Action>
		</Confirmation.Actions>
	</Confirmation.Root>
</div>
