<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/message/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/p/message.json`,
		blockname: "message",
		isJsrepo: false,
	}}
	type="prompt-kit"
/>
