<script lang="ts">
	type Props = {
		class?: string;
		size?: number;
	};

	let { class: className = "", size = 16, ...restProps }: Props = $props();
</script>

<svg
	{...restProps}
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path d="m12 1-3 2v3.5a1.5 1.5 0 0 0 1.5 1.5H12v-8Z" />
	<path d="M12 8v13" />
	<path d="M12 8h1.5a1.5 1.5 0 0 0 1.5-1.5V3l-3-2Z" />
</svg>
