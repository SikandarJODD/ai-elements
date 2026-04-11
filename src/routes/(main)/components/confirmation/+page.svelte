<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/confirmation/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="An alert-based component for managing tool execution approval workflows with request, accept, and reject states."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/confirmation.json`,
		blockname: "confirmation",
		isJsrepo: true,
	}}
/>
