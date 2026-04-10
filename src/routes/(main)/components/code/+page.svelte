<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/code/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	componentName="Code"
	intro="The CodeBlock component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/code.json`,
		blockname: "code",
		isJsrepo: true,
	}}
/>
