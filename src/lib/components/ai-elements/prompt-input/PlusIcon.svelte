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
	<path d="M5 12h14" />
	<path d="M12 5v14" />
</svg>
