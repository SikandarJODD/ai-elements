<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/reasoning/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/reasoning.json`,
		blockname: "reasoning",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="items-start justify-start p-0"
/>
