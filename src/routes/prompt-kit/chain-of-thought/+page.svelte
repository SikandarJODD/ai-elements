<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/chain-of-thought/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The ChainOfThought component provides a visual indicator of the AI's thought process with optional stop functionality."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/p/chain-of-thought.json`,
		blockname: "chain-of-thought",
		isJsrepo: false,
	}}
/>
