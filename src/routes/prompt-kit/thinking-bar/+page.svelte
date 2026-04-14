<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/thinking-bar/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The ThinkingBar component provides a visual indicator of the AI's thought process with optional stop functionality."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/p/thinking-bar.json`,
		blockname: "thinking-bar",
		isJsrepo: false,
	}}
	type="prompt-kit"
/>
