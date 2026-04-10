<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/response/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/response.json`,
		blockname: "response",
		isJsrepo: true,
	}}
	previewIsCentered={false}
	previewClass="dark-scrollbar max-h-[500px] items-start justify-start overflow-y-auto p-0"
/>
