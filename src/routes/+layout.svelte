<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher } from "mode-watcher";
	import AppNavbar from "$lib/components/layouts/app-navbar.svelte";
	import AppNewNavbar from "$lib/components/layouts/app-new-navbar.svelte";
	import { Toaster } from "svelte-sonner";
	let { children } = $props();
</script>

<!-- <AppNavbar /> -->
<AppNewNavbar />
<!-- Spacer to prevent content from being hidden under fixed navbar -->
<div class="h-16"></div>
<ModeWatcher />
<Toaster />
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children?.()}
