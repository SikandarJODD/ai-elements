<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/plan/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/plan.json`,
		blockname: "plan",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="items-start justify-start"
/>
