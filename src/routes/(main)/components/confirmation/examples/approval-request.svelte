<script lang="ts">
	import {
		Confirmation,
		ConfirmationAccepted,
		ConfirmationAction,
		ConfirmationActions,
		ConfirmationRejected,
		ConfirmationRequest,
		ConfirmationTitle,
	} from "$lib/components/ai-elements/confirmation/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import XIcon from "@lucide/svelte/icons/x";

	// Generate a unique ID for the approval
	let approvalId = crypto.randomUUID();
</script>

<div class="w-full max-w-2xl">
	<Confirmation approval={{ id: approvalId }} state="approval-requested">
		<ConfirmationTitle>
			<ConfirmationRequest>
				This tool wants to execute a query on the production database:
				<code class="mt-2 block rounded bg-muted p-2 text-sm">
					SELECT * FROM users WHERE role = 'admin'
				</code>
			</ConfirmationRequest>
			<ConfirmationAccepted>
				<CheckIcon class="size-4 text-green-600 dark:text-green-400" />
				<span>You approved this tool execution</span>
			</ConfirmationAccepted>
			<ConfirmationRejected>
				<XIcon class="text-destructive size-4" />
				<span>You rejected this tool execution</span>
			</ConfirmationRejected>
		</ConfirmationTitle>
		<ConfirmationActions>
			<ConfirmationAction
				onclick={() => {
					// In production, call respondToConfirmationRequest with approved: false
					console.log("Rejected");
				}}
				variant="outline"
			>
				Reject
			</ConfirmationAction>
			<ConfirmationAction
				onclick={() => {
					// In production, call respondToConfirmationRequest with approved: true
					console.log("Approved");
				}}
				variant="default"
			>
				Approve
			</ConfirmationAction>
		</ConfirmationActions>
	</Confirmation>
</div>

