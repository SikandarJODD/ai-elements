<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/text-shimmer/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/p/text-shimmer.json`,
		blockname: "text-shimmer",
		isJsrepo: false,
	}}
	type="prompt-kit"
/>
