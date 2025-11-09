<script lang="ts">
	import {
		Confirmation,
		ConfirmationAccepted,
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
	<Confirmation approval={{ id: approvalId, approved: false }} state="output-denied">
		<ConfirmationTitle>
			<ConfirmationRequest>
				This tool wants to delete the file
				<code class="rounded bg-muted px-1.5 py-0.5 text-sm">
					/tmp/example.txt
				</code>
				. Do you approve this action?
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
	</Confirmation>
</div>

