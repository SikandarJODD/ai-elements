<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { ComponentPageDocs } from "$lib/components/docs";
	import { data } from "./data";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/image/llms.txt`;
</script>

<ComponentPageDocs
	{data}
	{llmsTxtUrl}
	intro="The Image component displays AI-generated images from base64 encoded data. It's designed to work seamlessly with the AI SDK's Experimental_GeneratedImage type and provides automatic styling with proper accessibility features."
	installation={{
		specifier: `${PUBLIC_WEBSITE_URL}/r/image.json`,
		blockname: "image",
		isJsrepo: true,
	}}
/>
