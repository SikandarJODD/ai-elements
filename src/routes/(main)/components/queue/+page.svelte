<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/queue/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="A comprehensive queue component system for displaying message lists, todos, and collapsible task sections in AI applications."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/queue.json`,
		blockname: "queue",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="items-start justify-start"
/>
