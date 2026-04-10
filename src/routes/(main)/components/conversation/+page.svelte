<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/conversation/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/conversation.json`,
		blockname: "conversation",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="h-96 p-0"
/>
