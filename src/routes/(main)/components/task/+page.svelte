<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/task/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/task.json`,
		blockname: "task",
		isJsrepo: true,
	}}
/>
