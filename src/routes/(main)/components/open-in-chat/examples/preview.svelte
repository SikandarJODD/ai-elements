<script lang="ts">
	import {
		OpenIn,
		OpenInChatGPT,
		OpenInClaude,
		OpenInContent,
		OpenInScira,
		OpenInT3,
		OpenInTrigger,
		OpenInV0,
	} from "$lib/components/ai-elements/open-in-chat/index.js";

	let sampleQuery = "How can I implement authentication in SvelteKit?";
</script>

<div class="flex flex-col items-center space-y-4">
	<div class="text-muted-foreground text-sm">
		Click the button below to open the query in various AI chat platforms:
	</div>

	<div class="bg-muted rounded p-2 font-mono text-sm">
		Query: "{sampleQuery}"
	</div>

	<OpenIn query={sampleQuery}>
		<OpenInTrigger />
		<OpenInContent>
			<OpenInChatGPT />
			<OpenInClaude />
			<OpenInT3 />
			<OpenInScira />
			<OpenInV0 />
		</OpenInContent>
	</OpenIn>
</div>
