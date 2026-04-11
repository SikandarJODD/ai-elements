<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/checkpoint/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="A simple component for marking conversation history points and restoring the chat to a previous state."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/checkpoint.json`,
		blockname: "checkpoint",
		isJsrepo: true,
	}}
/>
