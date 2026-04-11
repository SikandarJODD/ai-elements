<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/suggestion/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Suggestion component displays a horizontal row of clickable suggestions for user interaction."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/suggestion.json`,
		blockname: "suggestion",
		isJsrepo: true,
	}}
/>
