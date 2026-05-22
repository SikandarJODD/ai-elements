<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import { Toaster } from "svelte-sonner";
	import { PressedKeys, activeElement } from "runed";
	import AppHeader from "$lib/components/docs/layout/navigation/header/app-header.svelte";
	let { children } = $props();

	let keys = new PressedKeys();
	keys.onKeys(["d"], () => {
		if (
			activeElement.current?.localName === "textarea" ||
			activeElement.current?.localName === "input"
		)
			return;
		toggleMode();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" />
<Toaster richColors position="bottom-center" />

<AppHeader />
{@render children?.()}
