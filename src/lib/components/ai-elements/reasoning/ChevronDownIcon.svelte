<script lang="ts">
	interface Props {
		class?: string;
		size?: number | string;
	}

	let { class: className = '', size = 16, ...restProps }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	{...restProps}
>
	<path d="m6 9 6 6 6-6"/>
</svg>