<script lang="ts">
	import { SystemMessage } from '$lib/components/prompt-kit/system-message/index.js';
</script>

<div class="flex flex-col gap-3">
	<SystemMessage>
		This conversation is visible to your team. Avoid sharing sensitive personal data.
	</SystemMessage>

	<SystemMessage fill>
		You can switch to a private workspace at any time from the header.
	</SystemMessage>
</div>
