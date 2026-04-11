<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/chain-of-thought/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The ChainOfThought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. It helps users understand how AI arrives at conclusions."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/chain-of-thought.json`,
		blockname: "chain-of-thought",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="items-start justify-start"
/>
