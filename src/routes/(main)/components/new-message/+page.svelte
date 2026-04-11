<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/new-message/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/new-message.json`,
		blockname: "new-message",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="items-start justify-start"
	previewShowRetry={false}
/>
