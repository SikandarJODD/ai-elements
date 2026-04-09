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
	<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
</svg>
