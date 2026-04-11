<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/sources/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Sources component allows a user to view the sources or citations used to generate a response."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/sources.json`,
		blockname: "sources",
		isJsrepo: true,
	}}
/>
