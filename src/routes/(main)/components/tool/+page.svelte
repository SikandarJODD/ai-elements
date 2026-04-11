<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/tool/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Tool component displays a collapsible interface for showing and hiding tool details from AI SDK tool parts."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/tool.json`,
		blockname: "tool",
		isJsrepo: true,
	}}
/>
