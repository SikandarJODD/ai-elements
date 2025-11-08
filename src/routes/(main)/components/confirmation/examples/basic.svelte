<script lang="ts">
	import {
		Confirmation,
		ConfirmationTitle,
		ConfirmationRequest,
		ConfirmationAccepted,
		ConfirmationRejected,
		ConfirmationActions,
		ConfirmationAction,
	} from "$lib/components/ai-elements/confirmation/index.js";
	import type {
		ToolUIPartApproval,
		ToolUIPartState,
	} from "$lib/components/ai-elements/confirmation/confirmation-context.svelte.js";
	import {
		Conversation,
		ConversationContent,
	} from "$lib/components/ai-elements/conversation/index.js";
	import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";

	let approval: ToolUIPartApproval = $state({
		id: "tool-1",
	});

	let confirmationState: ToolUIPartState = $state("approval-requested");

	function handleApprove() {
		approval = { id: "tool-1", approved: true };
		confirmationState = "approval-responded";
	}

	function handleReject() {
		approval = { id: "tool-1", approved: false, reason: "User declined the action" };
		confirmationState = "output-denied";
	}
</script>

<div class="flex size-full flex-col rounded-lg border p-6">
	<Conversation>
		<ConversationContent>
			<Message from="assistant">
				<MessageContent>
					I can help you delete those files. Would you like me to proceed?
				</MessageContent>

				<Confirmation {approval} state={confirmationState}>
					<ConfirmationTitle>
						Delete 3 files from the project directory?
					</ConfirmationTitle>

					<ConfirmationRequest>
						<ConfirmationActions>
							<ConfirmationAction variant="default" onclick={handleApprove}>
								Approve
							</ConfirmationAction>
							<ConfirmationAction variant="outline" onclick={handleReject}>
								Reject
							</ConfirmationAction>
						</ConfirmationActions>
					</ConfirmationRequest>

					<ConfirmationAccepted>
						Files have been deleted successfully.
					</ConfirmationAccepted>

					<ConfirmationRejected>
						Action was rejected. Files were not deleted.
					</ConfirmationRejected>
				</Confirmation>
			</Message>
		</ConversationContent>
	</Conversation>
</div>
