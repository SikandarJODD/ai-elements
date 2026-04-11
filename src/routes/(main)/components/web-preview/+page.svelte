<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/web-preview/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/web-preview.json`,
		blockname: "web-preview",
		isJsrepo: true,
	}}
/>
