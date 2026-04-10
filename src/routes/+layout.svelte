<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import AppNewNavbar from "$lib/components/layouts/app-new-navbar.svelte";
	import { Toaster } from "svelte-sonner";
	import { PressedKeys } from "runed";
	let { children } = $props();

	let keys = new PressedKeys();
	// keys.onKeys(["d"], () => {
	// 	console.log("Toggling mode");
	// 	toggleMode();
	// });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" />
<Toaster />

<!-- <AppNavbar /> -->
<AppNewNavbar />
<div class="h-16"></div>
<!-- Spacer to prevent content from being hidden under fixed navbar -->
{@render children?.()}
