<script lang="ts">
	import { SystemMessage } from "$lib/components/prompt-kit/system-message/index.js";
</script>

<div class="flex flex-col gap-3">
	<SystemMessage variant="action" fill>
		The model is running in reasoning mode. Responses might take slightly longer.
	</SystemMessage>

	<SystemMessage variant="warning" fill>
		Context window is close to the limit. Summarize the conversation or archive older messages.
	</SystemMessage>

	<SystemMessage variant="error" fill>
		The tool integration failed. Review the API credentials before retrying the request.
	</SystemMessage>
</div>
