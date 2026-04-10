<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/open-in-chat/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Open In Chat component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/open-in-chat.json`,
		blockname: "open-in-chat",
		isJsrepo: true,
	}}
/>
