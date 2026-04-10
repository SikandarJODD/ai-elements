<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/context/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Context component provides a comprehensive view of AI model usage through a compound component system. It displays context window utilization, token consumption breakdown (input, output, reasoning, cache), and cost estimation in an interactive hover card interface."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/context.json`,
		blockname: "context",
		isJsrepo: true,
	}}
/>
