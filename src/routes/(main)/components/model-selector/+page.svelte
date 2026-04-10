<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/model-selector/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="A searchable command palette for selecting AI models in your chat interface."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/model-selector.json`,
		blockname: "model-selector",
		isJsrepo: true,
	}}
/>
