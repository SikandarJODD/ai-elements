<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/actions/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	llmsTxtUrl={llmsTxtUrl}
	intro="The Action component provides a flexible row of action buttons for AI responses with common actions like retry, like, dislike, copy, and share."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/action.json`,
		blockname: "action",
		isJsrepo: false,
	}}
/>
