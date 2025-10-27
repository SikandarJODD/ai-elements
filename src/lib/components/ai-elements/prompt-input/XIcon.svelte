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
	<path d="M18 6 6 18" />
	<path d="m6 6 12 12" />
</svg>
