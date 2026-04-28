<script lang="ts">
	import CookbookPlaygroundShell from "$lib/components/cookbook-playground/cookbook-playground-shell.svelte";
	import { pageData } from "./data";
</script>

<svelte:head>
	<title>{pageData.title} - Cookbook Playground</title>
	<meta name="description" content={pageData.description} />
</svelte:head>

<CookbookPlaygroundShell item={pageData} />
