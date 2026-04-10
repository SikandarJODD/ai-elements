<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/shimmer/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="An animated text shimmer component for creating eye-catching loading states and progressive reveal effects."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/shimmer.json`,
		blockname: "shimmer",
		isJsrepo: true,
	}}
/>
