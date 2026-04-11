<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/artifact/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Artifact component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/artifact.json`,
		blockname: "artifact",
		isJsrepo: true,
	}}
/>
